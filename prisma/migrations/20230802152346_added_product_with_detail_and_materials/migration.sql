-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `businessId` INTEGER NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(200) NULL,
    `image` VARCHAR(150) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_costs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `cost_threshold` INTEGER NOT NULL,
    `average_cost` FLOAT NOT NULL,
    `profit` FLOAT NOT NULL,
    `selling_price` FLOAT NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `product_costs_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_materials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productCostId` INTEGER NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `unit_price` FLOAT NOT NULL,
    `cost` FLOAT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `businesses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_costs` ADD CONSTRAINT `product_costs_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_materials` ADD CONSTRAINT `product_materials_productCostId_fkey` FOREIGN KEY (`productCostId`) REFERENCES `product_costs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
