/*
  Warnings:

  - Added the required column `category` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `premiere` BOOLEAN NOT NULL DEFAULT false;
