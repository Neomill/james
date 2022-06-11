import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { TAKE } from "../lib/constants";
import prisma from "../lib/prisma";
const model = prisma.transaction;

class TransactionController {
  static getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let [data, totalData] = await prisma.$transaction([
        model.findMany(),
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
      transaction_code,
    } = req.query;
    const filters: any = [];
    let where: any = {
      OR: [
        {
          transaction_code: {
            contains: query + "",
          },
        },
      ],
      AND: filters,
    };
    let orderBy: any = {};
    if (updatedAt) {
      Object.assign(orderBy, {
        updatedAt: Number(updatedAt) ? "desc" : "asc",
      });
    } else if (transaction_code) {
      Object.assign(orderBy, {
        transaction_code: Number(transaction_code) ? "desc" : "asc",
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
            employee: {
              select: {
                id: true,
              },
            },
            customer: {
              select: {
                fname: true,
              },
            },
            invoice: {
              select: {
                id: true,
              },
            },
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
          employee: true,
          customer: true,
          invoice: {
            include: {
              orders: {
                include: {
                  menu_item: {
                    select: {
                      name: true,
                      selling_price: true,
                    },
                  },
                },
              },
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
    const authUser: any = req.user;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { transaction_code, invoice_id, cash } = req.body;
    try {
      const invoice = await prisma.invoice.findFirst({
        where: {
          id: Number(invoice_id),
        },
        include: {
          customer: true,
          orders: {
            select: {
              qty: true,
              menu_item: true,
            },
          },
        },
      });
      let price = 0;
      if (invoice?.orders) {
        for (const order of invoice?.orders) {
          if (Number(order?.qty) > Number(order?.menu_item.qty)) {
            return res.send(
              `${order?.menu_item.name} qty ${order?.menu_item.qty} less the than the qty of the order ${order?.qty}`
            );
          }
          if (order.menu_item.selling_price) {
            price += Number(order.menu_item.selling_price) * Number(order.qty);
          }
          await prisma.menuItem.update({
            where: {
              id: Number(order?.menu_item.id),
            },
            data: {
              qty: {
                decrement: order?.qty,
              },
            },
          });
        }
      }
      if (Number(cash) < price) {
        return res.status(400).send("Insufficient cash!");
      }
      const data = await prisma.$transaction([
        model.create({
          data: {
            transaction_code,
            employee_id: Number(authUser?.employee?.id),
            customer_id: Number(invoice?.customer.id),
            invoice_id: Number(invoice?.id),
            price,
            cash,
            change: Number(cash) - Number(price),
          },
        }),
        prisma.invoice.update({
          where: {
            id: Number(invoice_id),
          },
          data: {
            payment_status: "PAID",
          },
        }),
      ]);

      return res.status(200).send(data);
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };

  // static delete = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const [transaction] = await prisma.$transaction([
  //       model.delete({
  //         where: {
  //           id: Number(req.params.id),
  //         },
  //         include: {
  //           invoice: true,
  //         },
  //       }),
  //     ]);
  //     const menuitem = await prisma.menuItem.update({
  //       where: {
  //         id: Number(transaction?.),
  //       },
  //       data: {
  //         qty: {
  //           increment: transaction?.order.qty,
  //         },
  //       },
  //     });
  //     return res.status(200).send(transaction);
  //   } catch (error: any) {
  //     return res.status(404).send(error.message);
  //   }
  // };

  // static deleteMany = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const [data, deleted] = await prisma.$transaction([
  //       model.findMany({
  //         where: {
  //           id: {
  //             in: req.body,
  //           },
  //         },
  //         include: {
  //           order: true,
  //         },
  //       }),
  //       model.deleteMany({
  //         where: {
  //           id: {
  //             in: req.body,
  //           },
  //         },
  //       }),
  //     ]);
  //     let menuitem = [];
  //     for (let i = 0; i < data.length; i++) {
  //       const element = data[i];
  //       menuitem.push(
  //         await prisma.menuItem.update({
  //           where: {
  //             id: Number(data[i]?.menu_item_id),
  //           },
  //           data: {
  //             qty: {
  //               increment: data[i]?.order.qty,
  //             },
  //           },
  //         })
  //       );
  //     }

  //     return res.status(200).send([menuitem, deleted]);
  //   } catch (error: any) {
  //     return res.status(404).send(error.message);
  //   }
  // };
}

export default TransactionController;
