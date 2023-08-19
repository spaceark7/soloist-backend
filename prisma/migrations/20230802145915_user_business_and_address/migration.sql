/*
  Warnings:

  - A unique constraint covering the columns `[businessId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_userId_fkey`;

-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `businessId` INTEGER NULL,
    ADD COLUMN `latitude` FLOAT NULL,
    ADD COLUMN `longitude` FLOAT NULL,
    ADD COLUMN `postalCode` VARCHAR(10) NULL,
    MODIFY `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `businesses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(191) NOT NULL,
    `business_name` VARCHAR(50) NOT NULL,
    `business_phone` VARCHAR(26) NULL,
    `business_email` VARCHAR(50) NULL,
    `business_description` VARCHAR(200) NULL,
    `business_logo` VARCHAR(150) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `businesses_userEmail_key`(`userEmail`),
    UNIQUE INDEX `businesses_business_email_key`(`business_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `addresses_businessId_key` ON `addresses`(`businessId`);

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `businesses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
