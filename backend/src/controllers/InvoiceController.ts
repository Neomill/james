import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { TAKE } from "../lib/constants";
import prisma from "../lib/prisma";
const model = prisma.invoice;

class InvoiceController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let [data, totalData] = await prisma.$transaction([
        model.findMany({
          include: {
            orders: true,
          },
        }),
        model.count(),
      ]);
      return res.status(200).send({ body: data, totalData });
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };

  static search = async (req: Request, res: Response) => {
    const {
      query = "",
      page = 0,
      createdAt,
      updatedAt = 1,
      id,
      status,
      payment_status,
    } = req.query;
    const filters: any = [];

    status &&
      filters.push({
        status,
      });
    payment_status &&
      filters.push({
        payment_status,
      });
    let where: any = {

      AND: filters,
    };

    let orderBy: any = {};
    if (updatedAt) {
      Object.assign(orderBy, {
        updatedAt: Number(updatedAt) ? "desc" : "asc",
      });
    } else if (id) {
      Object.assign(orderBy, {
        id: Number(id) ? "desc" : "asc",
      });
    } else {
      Object.assign(orderBy, {
        createdAt: Number(createdAt) ? "desc" : "asc",
      });
    }

    try {
      let [data, totalData] = await prisma.$transaction([
        model.findMany({
          skip: Number(page) * 10,
          take: TAKE,
          include: {
            orders: true,
          },
          where,
          orderBy,
        }),
        model.count({ where }),
      ]);

      let totalPages = Math.ceil(Number(totalData) / Number(TAKE)) - 1;

      let hasMore = false;
      if (page < totalPages) {
        hasMore = true;
      }
      return res.status(200).send({ body: data, totalPages, hasMore });
    } catch (e: any) {
      return res.status(400).send(e.message);
    }
  };

  static getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await model.findFirst({
        where: {
          id: Number(req.params.id),
        },
        include: {
          transaction: true,
          orders: {
            include: {
              menu_item: true,
            },
          },
        },
      });
      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fname, lname, mname, phone, address, orders, table_id } = req.body;
    try {
      let sanitized_orders = [];
      for (const order of orders) {
        const menu_item = await prisma.menuItem.findFirst({
          where: {
            id: Number(order.menu_item_id),
          },
          select: {
            id: true,
            selling_price: true,
            qty: true,
            name: true,
          },
        });
        if (Number(order?.qty) > Number(menu_item?.qty)) {
          return res.status(400).send(`${menu_item?.name} is out of stock`);
        }
        sanitized_orders.push({
          ...order,
          price: menu_item?.selling_price,
        });
      }
      const invoice = await model.create({
        data: {
          customer: {
            create: {
              fname,
              lname,
              mname,
              phone,
              address,
            },
          },
          orders: {
            createMany: {
              data: sanitized_orders,
            },
          },
        },
      });

      return res.status(200).send(invoice);
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };

  static update = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { status, payment_status } = req.body;
    try {
      const data = await model.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status,
          payment_status,
        },
      });
      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };

  static delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await model.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };
}

export default InvoiceController;
