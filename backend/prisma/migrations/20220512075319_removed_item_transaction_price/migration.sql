/*
  Warnings:

  - You are about to drop the column `cost_price` on the `ItemTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price` on the `ItemTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ItemTransaction` DROP COLUMN `cost_price`,
    DROP COLUMN `selling_price`;
