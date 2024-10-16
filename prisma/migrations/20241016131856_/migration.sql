-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INCOMPLETE', 'EMPLOYEE', 'EMPLOYER');

-- AlterTable
ALTER TABLE "ApplicationSubmission" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'INCOMPLETE';
