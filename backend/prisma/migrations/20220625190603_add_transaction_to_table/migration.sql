-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_customer_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `branch_id` INTEGER NULL,
    MODIFY `customer_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `Branch`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
