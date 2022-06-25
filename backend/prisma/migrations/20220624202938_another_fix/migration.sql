/*
  Warnings:

  - You are about to drop the column `linkInvoice` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `linkInvoice`,
    ADD COLUMN `link_invoice` INTEGER NULL DEFAULT 0;
