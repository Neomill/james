/*
  Warnings:

  - You are about to drop the `ItemsOnPoRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item_id` to the `PO_Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `PO_Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ItemsOnPoRequest` DROP FOREIGN KEY `ItemsOnPoRequest_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `ItemsOnPoRequest` DROP FOREIGN KEY `ItemsOnPoRequest_po_request_id_fkey`;

-- AlterTable
ALTER TABLE `PO_Request` ADD COLUMN `item_id` INTEGER NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ItemsOnPoRequest`;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
