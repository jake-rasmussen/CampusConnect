/*
  Warnings:

  - Added the required column `evaluation` to the `ApplicationSubmissionEvaluation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationSubmissionEvaluationGrade" AS ENUM ('YES', 'NO', 'MAYBE');

-- AlterTable
ALTER TABLE "ApplicationSubmissionEvaluation" ADD COLUMN     "evaluation" "ApplicationSubmissionEvaluationGrade" NOT NULL;
