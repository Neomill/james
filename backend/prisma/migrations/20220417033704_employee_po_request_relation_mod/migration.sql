/*
  Warnings:

  - You are about to drop the column `approver_id` on the `PO_Request` table. All the data in the column will be lost.
  - You are about to drop the column `requisitioner_id` on the `PO_Request` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_approver_id_fkey`;

-- DropForeignKey
ALTER TABLE `PO_Request` DROP FOREIGN KEY `PO_Request_requisitioner_id_fkey`;

-- AlterTable
ALTER TABLE `PO_Request` DROP COLUMN `approver_id`,
    DROP COLUMN `requisitioner_id`;
