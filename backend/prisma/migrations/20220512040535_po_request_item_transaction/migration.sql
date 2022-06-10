/*
  Warnings:

  - You are about to drop the column `item_id` on the `PO_Request` table. All the data in the column will be lost.
  - Added the required column `item_transaction_id` to the `PO_Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_item_id_fkey`;

-- AlterTable
ALTER TABLE `PO_Request` DROP COLUMN `item_id`,
    ADD COLUMN `item_transaction_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_item_transaction_id_fkey` FOREIGN KEY (`item_transaction_id`) REFERENCES `ItemTransaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
