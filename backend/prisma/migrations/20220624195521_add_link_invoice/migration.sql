/*
  Warnings:

  - You are about to drop the column `request_invoice_id` on the `invoice` table. All the data in the column will be lost.
  - You are about to drop the `requestinvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `invoice` DROP FOREIGN KEY `Invoice_request_invoice_id_fkey`;

-- DropForeignKey
ALTER TABLE `requestinvoice` DROP FOREIGN KEY `RequestInvoice_to_branch_id_fkey`;

-- AlterTable
ALTER TABLE `invoice` DROP COLUMN `request_invoice_id`,
    ADD COLUMN `linkInvoice` INTEGER NULL;

-- DropTable
DROP TABLE `requestinvoice`;
