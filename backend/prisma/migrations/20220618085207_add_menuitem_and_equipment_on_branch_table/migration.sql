-- AlterTable
ALTER TABLE `equipment` ADD COLUMN `branch_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `menuitem` ADD COLUMN `branch_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
