import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

class OverviewController {
  static index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let [
        totalItems,
        totalInStockItems,
        totalLowStockItems,
        totalOutOfStockItems,
        totalGoodConditionItems,
        totalExpiredItems,
        totalNoOfPurchase,
        totalPullout,
        totalCustomers,
        totalSuppliers,
        totalAggregateRevenue,
        menuItems,
        totalTransactions,
      ] = await prisma.$transaction([
        prisma.item.count(),
        prisma.item.count({
          where: {
            status: "IN_STOCK",
          },
        }),
        prisma.item.count({
          where: {
            status: "LOW_STOCK",
          },
        }),
        prisma.item.count({
          where: {
            status: "OUT_OF_STOCK",
          },
        }),
        prisma.itemTransaction.count({
          where: {
            condition: "GOOD",
          },
        }),
        prisma.itemTransaction.count({
          where: {
            condition: "EXPIRED",
          },
        }),
        prisma.itemTransaction.count(),
        prisma.pO_Request.count(),
        prisma.customer.count(),
        prisma.company.count(),
        prisma.transaction.aggregate({
          _sum: {
            price: true,
          },
        }),
        prisma.menuItem.findMany({
          select: {
            cost_price: true,
            qty: true,
          },
        }),
        prisma.transaction.count(),
      ]);

      const totalCost = menuItems.reduce(
        (partialSum, menuItem) =>
          partialSum + Number(menuItem.cost_price) * Number(menuItem.qty),
        0
      );
      const totalRevenue = totalAggregateRevenue._sum.price;
      const totalProfit = Number(totalRevenue) - Number(totalCost);
      return res.status(200).send({
        totalItems,
        totalInStockItems,
        totalLowStockItems,
        totalOutOfStockItems,
        totalGoodConditionItems,
        totalExpiredItems,
        totalNoOfPurchase,
        totalPullout,
        totalCustomers,
        totalSuppliers,
        totalRevenue,
        totalCost,
        totalProfit,
        totalTransactions,
      });
    } catch (error: any) {
      return res.status(404).send(error.message);
    }
  };
}

export default OverviewController;
