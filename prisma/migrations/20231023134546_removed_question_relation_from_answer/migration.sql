/*
  Warnings:

  - You are about to drop the column `clubApplicationQuestionId` on the `ClubApplicationSubmissionAnswer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubApplicationSubmissionAnswer" DROP CONSTRAINT "ClubApplicationSubmissionAnswer_clubApplicationQuestionId_fkey";

-- AlterTable
ALTER TABLE "ClubApplicationSubmissionAnswer" DROP COLUMN "clubApplicationQuestionId";
