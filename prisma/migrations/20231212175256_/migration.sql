/*
  Warnings:

  - You are about to drop the `ApplicationSubmissionRubric` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationSubmissionComment" DROP CONSTRAINT "ApplicationSubmissionComment_applicationSubmissionRubricId_fkey";

-- DropTable
DROP TABLE "ApplicationSubmissionRubric";

-- CreateTable
CREATE TABLE "ApplicationSubmissionEvaluation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationSubmissionEvaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicationSubmissionComment" ADD CONSTRAINT "ApplicationSubmissionComment_applicationSubmissionRubricId_fkey" FOREIGN KEY ("applicationSubmissionRubricId") REFERENCES "ApplicationSubmissionEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
