/*
  Warnings:

  - A unique constraint covering the columns `[clubProfileId]` on the table `Club` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clubId]` on the table `ClubProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clubProfileId` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "clubProfileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Club_clubProfileId_key" ON "Club"("clubProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubProfile_clubId_key" ON "ClubProfile"("clubId");
