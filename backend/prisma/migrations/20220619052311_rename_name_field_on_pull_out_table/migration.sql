/*
  Warnings:

  - You are about to drop the column `name` on the `pullout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pull_out_id]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `PullOut_name_key` ON `pullout`;

-- AlterTable
ALTER TABLE `menuitem` ADD COLUMN `pull_out_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `pullout` DROP COLUMN `name`;

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_pull_out_id_key` ON `MenuItem`(`pull_out_id`);

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_pull_out_id_fkey` FOREIGN KEY (`pull_out_id`) REFERENCES `PullOut`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
