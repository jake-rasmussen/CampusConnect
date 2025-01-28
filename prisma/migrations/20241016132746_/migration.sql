/*
  Warnings:

  - You are about to drop the column `userType` on the `ApplicationSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationSubmission" DROP COLUMN "userType";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'INCOMPLETE';
