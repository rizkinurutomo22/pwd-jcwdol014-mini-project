-- CreateTable
CREATE TABLE `promos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `org_id` INTEGER NOT NULL,
    `org_name` VARCHAR(191) NOT NULL,
    `referal_code` VARCHAR(191) NOT NULL,
    `discout` INTEGER NOT NULL,
    `max_uses` INTEGER NOT NULL DEFAULT 1,
    `remaining` INTEGER NOT NULL,
    `valid_until` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
