/*
  Warnings:

  - You are about to drop the column `status` on the `PO_Request` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToPO_Request` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `reason` to the `PO_Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ItemToPO_Request` DROP FOREIGN KEY `_ItemToPO_Request_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ItemToPO_Request` DROP FOREIGN KEY `_ItemToPO_Request_ibfk_2`;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `desc` VARCHAR(191) NOT NULL DEFAULT 'N/A';

-- AlterTable
ALTER TABLE `PO_Request` DROP COLUMN `status`,
    ADD COLUMN `reason` ENUM('OVERSTOCKING', 'EXPIRED', 'BAD_ORDER', 'OTHERS') NOT NULL,
    MODIFY `remarks` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_ItemToPO_Request`;

-- CreateTable
CREATE TABLE `ItemsOnPoRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `po_request_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemsOnPoRequest` ADD CONSTRAINT `ItemsOnPoRequest_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemsOnPoRequest` ADD CONSTRAINT `ItemsOnPoRequest_po_request_id_fkey` FOREIGN KEY (`po_request_id`) REFERENCES `PO_Request`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
