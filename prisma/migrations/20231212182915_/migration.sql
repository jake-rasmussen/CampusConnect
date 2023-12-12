/*
  Warnings:

  - Added the required column `evaluatorName` to the `ApplicationSubmissionComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationSubmissionComment" ADD COLUMN     "evaluatorName" TEXT NOT NULL;
