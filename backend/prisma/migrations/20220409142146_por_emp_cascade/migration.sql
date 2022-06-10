-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_approver_id_fkey`;

-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_attendant_id_fkey`;

-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_requisitioner_id_fkey`;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_requisitioner_id_fkey` FOREIGN KEY (`requisitioner_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_attendant_id_fkey` FOREIGN KEY (`attendant_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PO_Request` ADD CONSTRAINT `PO_Request_approver_id_fkey` FOREIGN KEY (`approver_id`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
