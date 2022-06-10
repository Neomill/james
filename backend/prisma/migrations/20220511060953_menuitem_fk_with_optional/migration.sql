/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MenuItemCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MenuItem` ADD COLUMN `price` DECIMAL(19, 2) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `MenuItem_name_key` ON `MenuItem`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `MenuItemCategory_name_key` ON `MenuItemCategory`(`name`);
