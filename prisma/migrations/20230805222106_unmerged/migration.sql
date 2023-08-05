/*
  Warnings:

  - You are about to drop the column `required` on the `ClubApplicationQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `clubId` on the `ClubContactInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ClubApplication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clubProfileId` to the `ClubContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClubContactInfo" DROP CONSTRAINT "ClubContactInfo_clubId_fkey";

-- AlterTable
ALTER TABLE "ClubApplicationQuestion" DROP COLUMN "required";

-- AlterTable
ALTER TABLE "ClubContactInfo" DROP COLUMN "clubId",
ADD COLUMN     "clubProfileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClubProfile" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "timelineDesc" VARCHAR(500) NOT NULL DEFAULT '',

    CONSTRAINT "ClubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClubProfile_clubId_key" ON "ClubProfile"("clubId");

-- CreateIndex
CREATE UNIQUE INDEX "ClubApplication_name_key" ON "ClubApplication"("name");

-- AddForeignKey
ALTER TABLE "ClubProfile" ADD CONSTRAINT "ClubProfile_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubContactInfo" ADD CONSTRAINT "ClubContactInfo_clubProfileId_fkey" FOREIGN KEY ("clubProfileId") REFERENCES "ClubProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
