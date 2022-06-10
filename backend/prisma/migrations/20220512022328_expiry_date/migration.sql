/*
  Warnings:

  - You are about to drop the column `date_received` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `expiry_date` on the `Item` table. All the data in the column will be lost.
  - Added the required column `date_received` to the `ItemTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `date_received`,
    DROP COLUMN `expiry_date`;

-- AlterTable
ALTER TABLE `ItemTransaction` ADD COLUMN `date_received` DATETIME(3) NOT NULL;
