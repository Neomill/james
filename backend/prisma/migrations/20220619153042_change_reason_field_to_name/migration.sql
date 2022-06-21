/*
  Warnings:

  - You are about to drop the column `reason` on the `pullout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pullout` DROP COLUMN `reason`,
    ADD COLUMN `name` VARCHAR(191) NULL;
