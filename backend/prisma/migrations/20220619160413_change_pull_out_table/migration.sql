/*
  Warnings:

  - You are about to drop the column `pull_out_id` on the `menuitem` table. All the data in the column will be lost.
  - Added the required column `menu_item_id` to the `PullOut` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menuitem` DROP FOREIGN KEY `MenuItem_pull_out_id_fkey`;

-- AlterTable
ALTER TABLE `menuitem` DROP COLUMN `pull_out_id`;

-- AlterTable
ALTER TABLE `pullout` ADD COLUMN `menu_item_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PullOut` ADD CONSTRAINT `PullOut_menu_item_id_fkey` FOREIGN KEY (`menu_item_id`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
