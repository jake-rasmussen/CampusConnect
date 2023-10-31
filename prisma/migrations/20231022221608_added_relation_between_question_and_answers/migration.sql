/*
  Warnings:

  - Added the required column `clubApplicationQuestionId` to the `ClubApplicationSubmissionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubApplicationSubmissionAnswer" ADD COLUMN     "clubApplicationQuestionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClubApplicationSubmissionAnswer" ADD CONSTRAINT "ClubApplicationSubmissionAnswer_clubApplicationQuestionId_fkey" FOREIGN KEY ("clubApplicationQuestionId") REFERENCES "ClubApplicationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
