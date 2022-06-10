/*
  Warnings:

  - The values [EXPIRED] on the enum `Item_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `status` ENUM('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK') NULL;
