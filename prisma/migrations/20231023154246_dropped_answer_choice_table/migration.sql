/*
  Warnings:

  - You are about to drop the `ClubApplicationAnswerChoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" DROP CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" DROP CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationSubmissionAnswe_fkey";

-- AlterTable
ALTER TABLE "ClubApplicationQuestion" ADD COLUMN     "clubApplicationAnswerChoices" TEXT[];

-- AlterTable
ALTER TABLE "ClubApplicationSubmissionAnswer" ADD COLUMN     "selectedAnswers" TEXT[];

-- DropTable
DROP TABLE "ClubApplicationAnswerChoice";
