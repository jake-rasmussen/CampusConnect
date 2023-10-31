/*
  Warnings:

  - Added the required column `clubApplicationSubmissionStatus` to the `ClubApplicationSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ClubApplicationSubmissionStatus" AS ENUM ('NEW', 'DRAFT', 'SUBMITTED');

-- AlterTable
ALTER TABLE "ClubApplicationSubmission" ADD COLUMN     "clubApplicationSubmissionStatus" "ClubApplicationSubmissionStatus" NOT NULL;
