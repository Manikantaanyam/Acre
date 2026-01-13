/*
  Warnings:

  - You are about to drop the column `updated_At` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO', 'NOTE', 'CODE', 'LINK');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('UPLOADED', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updated_At";

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "status" "ItemStatus" NOT NULL,
    "storageUrl" TEXT,
    "mimeType" TEXT,
    "size" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemContent" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ItemContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemMetadata" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "tags" JSONB,

    CONSTRAINT "ItemMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoScene" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "startTime" DOUBLE PRECISION NOT NULL,
    "endTime" DOUBLE PRECISION NOT NULL,
    "caption" TEXT NOT NULL,

    CONSTRAINT "VideoScene_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemContent_itemId_key" ON "ItemContent"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemMetadata_itemId_key" ON "ItemMetadata"("itemId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemContent" ADD CONSTRAINT "ItemContent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemMetadata" ADD CONSTRAINT "ItemMetadata_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoScene" ADD CONSTRAINT "VideoScene_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
