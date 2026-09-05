-- CreateTable
CREATE TABLE "Cluster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "secret" TEXT NOT NULL
);
-- CreateTable
CREATE TABLE "DedicatedStorage" (
    "resourceId" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    PRIMARY KEY ("clusterId", "ownerId", "resourceId")
);