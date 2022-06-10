/*
  Warnings:

  - Added the required column `price` to the `ItemTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `ItemTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ItemTransaction` ADD COLUMN `price` DECIMAL(19, 2) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL;
