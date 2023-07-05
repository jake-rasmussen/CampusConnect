/*
  Warnings:

  - You are about to drop the column `clubProfileId` on the `Club` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Club_clubProfileId_key";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "clubProfileId";
