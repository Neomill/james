-- AlterTable
ALTER TABLE `ItemTransaction` ADD COLUMN `condition` ENUM('EXPIRED', 'GOOD') NOT NULL DEFAULT 'GOOD';
