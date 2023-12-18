/*
  Warnings:

  - Made the column `applicationId` on table `ApplicationSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ApplicationSubmission" DROP CONSTRAINT "ApplicationSubmission_applicationId_fkey";

-- AlterTable
ALTER TABLE "ApplicationSubmission" ALTER COLUMN "applicationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ApplicationSubmission" ADD CONSTRAINT "ApplicationSubmission_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
