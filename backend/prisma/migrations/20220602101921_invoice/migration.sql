/*
  Warnings:

  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `menu_item_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_menu_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_order_id_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `payment_status`,
    DROP COLUMN `status`,
    ADD COLUMN `invoice_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `menu_item_id`,
    DROP COLUMN `order_id`,
    ADD COLUMN `invoice_id` INTEGER NOT NULL,
    ADD COLUMN `price` DECIMAL(19, 2) NOT NULL;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('IN_PROGRESS', 'READY', 'VOID') NOT NULL DEFAULT 'IN_PROGRESS',
    `payment_status` ENUM('PENDING', 'PAID') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Transaction_invoice_id_key` ON `Transaction`(`invoice_id`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_invoice_id_fkey` FOREIGN KEY (`invoice_id`) REFERENCES `Invoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
