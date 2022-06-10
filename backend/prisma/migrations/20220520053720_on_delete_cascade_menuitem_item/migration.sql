-- DropForeignKey
ALTER TABLE `ItemTransaction` DROP FOREIGN KEY `ItemTransaction_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `MenuItemStock` DROP FOREIGN KEY `MenuItemStock_menu_item_id_fkey`;

-- AddForeignKey
ALTER TABLE `MenuItemStock` ADD CONSTRAINT `MenuItemStock_menu_item_id_fkey` FOREIGN KEY (`menu_item_id`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemTransaction` ADD CONSTRAINT `ItemTransaction_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
