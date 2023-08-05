/*
  Warnings:

  - You are about to drop the column `clubProfileId` on the `ClubContactInfo` table. All the data in the column will be lost.
  - You are about to drop the `ClubProfile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `required` to the `ClubApplicationQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubId` to the `ClubContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClubContactInfo" DROP CONSTRAINT "ClubContactInfo_clubProfileId_fkey";

-- DropForeignKey
ALTER TABLE "ClubProfile" DROP CONSTRAINT "ClubProfile_clubId_fkey";

-- DropIndex
DROP INDEX "ClubApplication_name_key";

-- AlterTable
ALTER TABLE "ClubApplicationQuestion" ADD COLUMN     "required" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ClubContactInfo" DROP COLUMN "clubProfileId",
ADD COLUMN     "clubId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ClubProfile";

-- AddForeignKey
ALTER TABLE "ClubContactInfo" ADD CONSTRAINT "ClubContactInfo_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
