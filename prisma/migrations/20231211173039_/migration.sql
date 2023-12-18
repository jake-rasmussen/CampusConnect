/*
  Warnings:

  - You are about to drop the `ApplicationScoringCriteria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationScoringCriteria" DROP CONSTRAINT "ApplicationScoringCriteria_applicationId_fkey";

-- DropTable
DROP TABLE "ApplicationScoringCriteria";

-- CreateTable
CREATE TABLE "ApplicationSubmissionRubric" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationSubmissionRubric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationSubmissionComment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "applicationSubmissionRubricId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationSubmissionComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicationSubmissionComment" ADD CONSTRAINT "ApplicationSubmissionComment_applicationSubmissionRubricId_fkey" FOREIGN KEY ("applicationSubmissionRubricId") REFERENCES "ApplicationSubmissionRubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;
