/*
  Warnings:

  - Added the required column `addressId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `addressId` INTEGER NOT NULL,
    ADD COLUMN `avatar` VARCHAR(150) NOT NULL,
    ADD COLUMN `phone` VARCHAR(26) NOT NULL;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `street` VARCHAR(150) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `addresses_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
