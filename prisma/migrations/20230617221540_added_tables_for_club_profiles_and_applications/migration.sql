-- CreateEnum
CREATE TYPE "SocialMediaPlatformType" AS ENUM ('TWITTER', 'INSTAGRAM', 'FACEBOOK', 'LINKEDIN', 'WEBSITE');

-- CreateEnum
CREATE TYPE "ClubApplicationQuestionType" AS ENUM ('TEXT_INPUT', 'TEXT_FIELD', 'MULTIPLE_CHOICE', 'MULTIPLE_SELECT', 'FILE_UPLOAD');

-- CreateEnum
CREATE TYPE "ClubApplicationStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED');

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubProfile" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "timelineDesc" VARCHAR(500) NOT NULL DEFAULT '',

    CONSTRAINT "ClubProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubContactInfo" (
    "id" TEXT NOT NULL,
    "clubProfileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL,

    CONSTRAINT "ClubContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "platform" "SocialMediaPlatformType" NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubEvent" (
    "id" TEXT NOT NULL,
    "clubProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "inPerson" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubApplication" (
    "id" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "status" "ClubApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubApplicationQuestion" (
    "id" TEXT NOT NULL,
    "orderNumber" INTEGER NOT NULL,
    "clubApplicationId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" "ClubApplicationQuestionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubApplicationQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubApplicationScoringCriteria" (
    "id" TEXT NOT NULL,
    "clubApplicationId" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 1,
    "orderNumber" INTEGER NOT NULL,
    "criteria" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClubApplicationScoringCriteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Club_name_key" ON "Club"("name");

-- AddForeignKey
ALTER TABLE "ClubProfile" ADD CONSTRAINT "ClubProfile_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubContactInfo" ADD CONSTRAINT "ClubContactInfo_clubProfileId_fkey" FOREIGN KEY ("clubProfileId") REFERENCES "ClubProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubEvent" ADD CONSTRAINT "ClubEvent_clubProfileId_fkey" FOREIGN KEY ("clubProfileId") REFERENCES "ClubProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplication" ADD CONSTRAINT "ClubApplication_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplicationQuestion" ADD CONSTRAINT "ClubApplicationQuestion_clubApplicationId_fkey" FOREIGN KEY ("clubApplicationId") REFERENCES "ClubApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplicationScoringCriteria" ADD CONSTRAINT "ClubApplicationScoringCriteria_clubApplicationId_fkey" FOREIGN KEY ("clubApplicationId") REFERENCES "ClubApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
