/*
  Warnings:

  - Added the required column `storage_location_id` to the `PO_Request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_attendant_id_fkey`;

-- AlterTable
ALTER TABLE `PO_Request` ADD COLUMN `storage_location_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_storage_location_id_fkey` FOREIGN KEY (`storage_location_id`) REFERENCES `Storage_location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_attendant_id_fkey` FOREIGN KEY (`attendant_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
