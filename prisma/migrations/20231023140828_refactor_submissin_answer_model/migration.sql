/*
  Warnings:

  - You are about to drop the column `selectedAnswers` on the `ClubApplicationSubmissionAnswer` table. All the data in the column will be lost.
  - Added the required column `clubApplicationQuestionId` to the `ClubApplicationSubmissionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubApplicationAnswerChoice" ADD COLUMN     "clubApplicationSubmissionAnswerId" TEXT;

-- AlterTable
ALTER TABLE "ClubApplicationSubmissionAnswer" DROP COLUMN "selectedAnswers",
ADD COLUMN     "clubApplicationQuestionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" ADD CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationSubmissionAnswe_fkey" FOREIGN KEY ("clubApplicationSubmissionAnswerId") REFERENCES "ClubApplicationSubmissionAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplicationSubmissionAnswer" ADD CONSTRAINT "ClubApplicationSubmissionAnswer_clubApplicationQuestionId_fkey" FOREIGN KEY ("clubApplicationQuestionId") REFERENCES "ClubApplicationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
