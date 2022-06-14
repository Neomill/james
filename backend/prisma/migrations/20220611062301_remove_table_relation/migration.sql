/*
  Warnings:

  - You are about to drop the column `table_id` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Invoice` DROP FOREIGN KEY `Invoice_table_id_fkey`;

-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `table_id`;
