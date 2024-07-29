-- AlterTable
ALTER TABLE `purchases` MODIFY `totalTickets` INTEGER NOT NULL DEFAULT 0,
    MODIFY `totalPrice` INTEGER NOT NULL DEFAULT 0;
