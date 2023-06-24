/*
  Warnings:

  - You are about to drop the column `clubProfileId` on the `ClubEvent` table. All the data in the column will be lost.
  - Added the required column `clubId` to the `ClubEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClubEvent" DROP CONSTRAINT "ClubEvent_clubProfileId_fkey";

-- AlterTable
ALTER TABLE "ClubEvent" DROP COLUMN "clubProfileId",
ADD COLUMN     "clubId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClubEvent" ADD CONSTRAINT "ClubEvent_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
