/*
  Warnings:

  - You are about to drop the column `applicationSubmissionRubricId` on the `ApplicationSubmissionComment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationSubmissionComment" DROP CONSTRAINT "ApplicationSubmissionComment_applicationSubmissionRubricId_fkey";

-- AlterTable
ALTER TABLE "ApplicationSubmissionComment" DROP COLUMN "applicationSubmissionRubricId",
ADD COLUMN     "applicationSubmissionEvaluationId" TEXT;

-- AddForeignKey
ALTER TABLE "ApplicationSubmissionComment" ADD CONSTRAINT "ApplicationSubmissionComment_applicationSubmissionEvaluati_fkey" FOREIGN KEY ("applicationSubmissionEvaluationId") REFERENCES "ApplicationSubmissionEvaluation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
