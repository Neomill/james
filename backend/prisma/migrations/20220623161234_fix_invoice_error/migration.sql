-- AlterTable
ALTER TABLE `invoice` ADD COLUMN `branch_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
