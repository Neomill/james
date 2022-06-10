/*
  Warnings:

  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ItemTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `MenuItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fname]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lname]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mname]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiry_date` to the `ItemTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `fname` VARCHAR(191) NULL,
    MODIFY `lname` VARCHAR(191) NULL,
    MODIFY `mname` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `price`,
    ADD COLUMN `cost_price` DECIMAL(19, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `selling_price` DECIMAL(19, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ItemTransaction` DROP COLUMN `price`,
    ADD COLUMN `cost_price` DECIMAL(19, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `expiry_date` DATETIME(3) NOT NULL,
    ADD COLUMN `selling_price` DECIMAL(19, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `MenuItem` DROP COLUMN `price`,
    ADD COLUMN `cost_price` DECIMAL(19, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `desc` VARCHAR(191) NOT NULL DEFAULT 'N/A',
    ADD COLUMN `expiry_date` DATETIME(3) NULL,
    ADD COLUMN `selling_price` DECIMAL(19, 2) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_fname_key` ON `Customer`(`fname`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_lname_key` ON `Customer`(`lname`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_mname_key` ON `Customer`(`mname`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_phone_key` ON `Customer`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_address_key` ON `Customer`(`address`);
