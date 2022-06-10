/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_customer_id_fkey`;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `customer_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `customer_id`;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
