/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cash` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `change` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Transaction` ADD COLUMN `cash` DECIMAL(19, 2) NOT NULL,
    ADD COLUMN `change` DECIMAL(19, 2) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Table_name_key` ON `Table`(`name`);
