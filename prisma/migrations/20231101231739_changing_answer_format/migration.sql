/*
  Warnings:

  - You are about to drop the column `selectedAnswers` on the `ApplicationSubmissionAnswer` table. All the data in the column will be lost.
  - Added the required column `answer` to the `ApplicationSubmissionAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationSubmissionAnswer" DROP COLUMN "selectedAnswers",
DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;
