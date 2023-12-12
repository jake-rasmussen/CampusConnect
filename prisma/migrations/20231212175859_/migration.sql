/*
  Warnings:

  - A unique constraint covering the columns `[applicationSubmissionId]` on the table `ApplicationSubmissionEvaluation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationSubmissionId` to the `ApplicationSubmissionEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationSubmissionEvaluation" ADD COLUMN     "applicationSubmissionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationSubmissionEvaluation_applicationSubmissionId_key" ON "ApplicationSubmissionEvaluation"("applicationSubmissionId");

-- AddForeignKey
ALTER TABLE "ApplicationSubmissionEvaluation" ADD CONSTRAINT "ApplicationSubmissionEvaluation_applicationSubmissionId_fkey" FOREIGN KEY ("applicationSubmissionId") REFERENCES "ApplicationSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
