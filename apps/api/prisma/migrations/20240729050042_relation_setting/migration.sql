/*
  Warnings:

  - Made the column `organizerId` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_organizerId_fkey`;

-- AlterTable
ALTER TABLE `events` MODIFY `organizerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_organizerId_fkey` FOREIGN KEY (`organizerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
