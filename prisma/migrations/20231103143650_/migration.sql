/*
  Warnings:

  - You are about to drop the column `applicationAnswerChoices` on the `ApplicationQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationQuestion" DROP COLUMN "applicationAnswerChoices",
ADD COLUMN     "answerChoices" TEXT[];
