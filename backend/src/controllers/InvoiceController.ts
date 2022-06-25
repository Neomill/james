import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
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

    const authUser: any = req.user;
    const filters: any = [];

    status &&
      filters.push({
        status,
      });
    payment_status &&
      filters.push({
        payment_status,
      });

    filters.push({
      branch_id: Number(authUser.employee.branch_id),
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
      console.log(e)
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
          branch: true,
          orders: {
            include: {
              menu_item: true,
            },
          },
          customer: true
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
    const { fname, lname, mname, phone, address, orders, table_id, req_branch } = req.body;

    const branch_id = req_branch

    try {
      let sanitized_orders = [];
      for (const order of orders) {
        const menu_item = await prisma.menuItem.findFirst({
          where: {
            id: Number(order.menu_item_id),
          },
          select: {
            id: true,
            branch_id: true,
            selling_price: true,
            qty: true,
            name: true,
          },
        });

        const orderQty = Number(order?.qty)
        const menuItemQty = Number(menu_item?.qty)
        
        if (orderQty > menuItemQty) {
          // set orderQty to available menuItemQty in current branch
          order.qty = menuItemQty

          const qtyToFind = orderQty - menuItemQty 

          const sufficientItem = await prisma.menuItem.findFirst({
              where: {
                qty: {
                  gte: Number(qtyToFind)
                },
                AND: {
                  name:{
                    equals: menu_item?.name
                  },
                },
                NOT:{
                  branch_id: {
                    equals: menu_item?.branch_id
                  }
                }
              },
              select: {
                id: true,
                branch: true,
                branch_id: true,
                selling_price: true,
                qty: true,
                name: true,
              },
            })

            // let reqOrderData = {
            //   qty : Number(qtyToFind),
            //   price: Number(sufficientItem?.selling_price),
            //   menu_item: {
            //     connect: {
            //       id : Number(order.menu_item_id),
            //     }
            //   }
            // }


            const branchCurrent = await prisma.branch.findFirst({ 
              where :{
                id : branch_id
              }
            })

            const reqOrderTO = await prisma.order.create({
              data: {
                qty : Number(qtyToFind),
                price: Number(sufficientItem?.selling_price),
                menu_item: {
                  connect: {
                    id : Number(order.menu_item_id),
                  }
                },
              }
            })

            const reqOrderFrom = await prisma.order.create({
              data: {
                qty : Number(qtyToFind),
                price: Number(sufficientItem?.selling_price),
                menu_item: {
                  connect: {
                    id : Number(order.menu_item_id),
                  }
                },
              }
            })

            const reqInvoiceTO = await model.create({
              data: {
                orders: {
                  connect: {
                    id : Number(reqOrderFrom?.id),
                  }
                },
                branch_id: sufficientItem?.branch_id,
                status: "REQUESTING_TO_OTHER_BRANCH",
                request_to_branch: sufficientItem?.branch_id,
                request_to_branch_NAME: `request from ${branchCurrent?.name}`, 
              },
            });

            console.log(sufficientItem?.branch_id)

            const reqInvoice = await model.create({
              data: {
                orders: {
                  connect: {
                    id : Number(reqOrderTO?.id),
                  }
                },
                branch_id: branch_id,
                status: "REQUESTING_TO_OTHER_BRANCH",
                request_to_branch: sufficientItem?.branch_id,
                link_invoice: reqInvoiceTO.id,
                request_to_branch_NAME: `request to ${sufficientItem?.branch?.name}`,
              },
            });

            const updateLink = await model.update({
              where: {
                id: Number(reqInvoiceTO.id),
              },
              data: {
                link_invoice: Number(reqInvoice.id)
              },
            });



            // const reqInvoiceTo = await prisma.requestInvoice.create({
            //   data : {
            //     invoice: {
            //       connect: {
            //         id : Number(reqInvoice?.id),
            //       }
            //     },
            //     from_branch_id: branch_id,
            //     to_branch: {
            //       connect:{
            //         id : Number(menu_item?.branch_id),
            //       }
            //     }
            //   }
            // })

        }
        sanitized_orders.push({
          ...order,
          price: menu_item?.selling_price,
        });
      }


      const invoice = await model.create({
        data: {
          orders: {
            createMany: {
              data: sanitized_orders,
            },
          },
          branch: {
            connect: {
              id : branch_id,
            }
          }
        },
      });

      console.log(invoice)

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

      const relatedInvoice = await model.findFirst({
        where: {
          id: Number(req.params.id),
        },
        select: {
          id: true,
          branch_id: true,
          request_to_branch: true,
          link_invoice: true
        },
      })


      
      if(relatedInvoice?.link_invoice != 0){
        console.log(relatedInvoice?.link_invoice)
        console.log("inside")
        const data = await model.update({
          where: {
            id: Number(relatedInvoice?.link_invoice),
          },
          data: {
            status,
            payment_status,
          },
        });
      }

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
