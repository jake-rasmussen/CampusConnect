/*
  Warnings:

  - You are about to drop the `SocialMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialMedia" DROP CONSTRAINT "SocialMedia_clubId_fkey";

-- DropTable
DROP TABLE "SocialMedia";

-- CreateTable
CREATE TABLE "ClubSocialMedia" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "platform" "SocialMediaPlatformType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubSocialMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubSocialMedia" ADD CONSTRAINT "ClubSocialMedia_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
