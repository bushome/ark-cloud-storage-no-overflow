-- CreateTable
CREATE TABLE `Cluster` (
    `id` VARCHAR(100) NOT NULL,
    `secret` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DedicatedStorage` (
    `resourceId` VARCHAR(500) NOT NULL,
    `clusterId` VARCHAR(100) NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`clusterId`, `ownerId`, `resourceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DeductionAuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clusterId` VARCHAR(191) NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `resourceId` VARCHAR(191) NOT NULL,
    `totalCost` INTEGER NOT NULL,
    `succeeded` BOOLEAN NOT NULL,
    `balanceAtEvent` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `DeductionAuditLog_owner_resource_created_idx`(`ownerId`, `resourceId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE `ResourceRateCeiling` (
    `resourceId` VARCHAR(191) NOT NULL,
    `maxLegitRatePerSec` DECIMAL(10,2) NOT NULL,
    `notes` VARCHAR(255) NULL,

    PRIMARY KEY (`resourceId`)
) DEFAULT CHARACTER SET utf8mb4;

-- Ceiling = fastest known legitimate consumption route x 152.4
-- (25.4x max Crafting Skill @ 244 stat points, x2 ClockFace, x3 Serene buff — vanilla defaults on this cluster)
INSERT INTO `ResourceRateCeiling` (`resourceId`, `maxLegitRatePerSec`, `notes`) VALUES
('PrimalItemResource_Sparkpowder_C',        2438.40, 'Stimulant @ Chemistry Bench, 16/sec base x152.4'),
('PrimalItemResource_Stone_C',              1219.20, 'Sparkpowder @ Chemistry Bench, 8/sec base x152.4 (Grinder confirmed slower, ~4-5/sec)'),
('PrimalItemResource_Flint_C',              2438.40, 'Sparkpowder @ Chemistry Bench, 16/sec base x152.4'),
('PrimalItemResource_Charcoal_C',           3657.60, 'Reinforced Ship Cannonball @ Tek Replicator, 24/sec base x152.4 (2s Smithy craft time, confirmed)'),
('PrimalItemConsumable_Berry_Narcoberry_C', 1219.20, 'Narcotic @ Chemistry Bench, 8/sec base x152.4'),
('PrimalItemConsumable_SpoiledMeat_C',       243.84, 'Narcotic @ Chemistry Bench, 1.6/sec base x152.4'),
('PrimalItemConsumable_Berry_Stimberry_C',  6096.00, 'Stimulant @ Chemistry Bench, 40/sec base x152.4'),
('PrimalItemResource_Gunpowder_C',         54864.00, 'Cannon Ball @ Tek Replicator, 360/sec base x152.4 (1s Smithy craft time, confirmed)'),
('PrimalItemResource_MetalIngot_C',       146304.00, 'Cannon Ball @ Tek Replicator, 960/sec base x152.4 (1s Smithy craft time, confirmed)'),
('PrimalItemResource_ChitinPaste_C',       36576.00, 'Cannon Ball @ Tek Replicator, 240/sec base x152.4 (1s Smithy craft time, confirmed)'),
('PrimalItemResource_Obsidian_C',           7315.20, 'Cannon Ball @ Tek Replicator, 48/sec base x152.4 (1s Smithy craft time, confirmed)'),
('PrimalItemConsumable_Narcotic_C',         9144.00, 'Corrosive Ship Cannonball @ Tek Replicator, 60/sec base x152.4 (2s Smithy craft time, confirmed)'),
('PrimalItemResource_Propellant_C',         1828.80, 'Incendiary Ship Cannonball @ Tek Replicator, 12/sec base x152.4 (2s Smithy craft time, confirmed)'),
('PrimalItemResource_Crystal_C',            7620.00, 'Mek Rocket Pod @ Tek Replicator (Tek-exclusive, no speed multiplier applies), 50/sec base x152.4'),
('PrimalItemResource_Polymer_C',           15240.00, 'Mek Rocket Pod @ Tek Replicator (Tek-exclusive, no speed multiplier applies), 100/sec base x152.4');

-- Flags (owner, resource) pairs whose 10-second-bucketed consumption
-- exceeds what any single legitimate structure could produce on this cluster.
CREATE VIEW `SuspiciousDeductionBursts` AS
SELECT
    d.ownerId,
    d.resourceId,
    d.clusterId,
    COUNT(*) AS eventCount,
    SUM(d.totalCost) AS totalConsumed,
    MIN(d.createdAt) AS windowStart,
    MAX(d.createdAt) AS windowEnd,
    r.maxLegitRatePerSec
FROM DeductionAuditLog d
JOIN ResourceRateCeiling r ON r.resourceId = d.resourceId
WHERE d.succeeded = TRUE
GROUP BY d.ownerId, d.resourceId, d.clusterId, FLOOR(UNIX_TIMESTAMP(d.createdAt) / 10)
HAVING SUM(d.totalCost) / 10 > r.maxLegitRatePerSec;