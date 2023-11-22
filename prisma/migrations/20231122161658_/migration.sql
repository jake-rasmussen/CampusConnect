-- DropForeignKey
ALTER TABLE "ApplicationSubmission" DROP CONSTRAINT "ApplicationSubmission_applicationId_fkey";

-- AlterTable
ALTER TABLE "ApplicationSubmission" ALTER COLUMN "applicationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ApplicationSubmission" ADD CONSTRAINT "ApplicationSubmission_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;
