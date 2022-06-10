/*
  Warnings:

  - You are about to drop the column `table_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `table_id` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_table_id_fkey`;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `table_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `table_id`;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_table_id_fkey` FOREIGN KEY (`table_id`) REFERENCES `Table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
