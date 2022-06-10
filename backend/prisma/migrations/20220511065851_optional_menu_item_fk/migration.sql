-- DropForeignKey
ALTER TABLE `MenuItem` DROP FOREIGN KEY `MenuItem_menu_item_category_id_fkey`;

-- AlterTable
ALTER TABLE `MenuItem` MODIFY `menu_item_category_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menu_item_category_id_fkey` FOREIGN KEY (`menu_item_category_id`) REFERENCES `MenuItemCategory`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;
