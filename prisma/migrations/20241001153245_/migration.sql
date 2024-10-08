/*
  Warnings:

  - You are about to drop the column `evaluatorName` on the `ApplicationSubmissionComment` table. All the data in the column will be lost.
  - Added the required column `memberProjectId` to the `ApplicationSubmissionComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberUserId` to the `ApplicationSubmissionComment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationSubmissionComment" DROP COLUMN "evaluatorName",
ADD COLUMN     "memberProjectId" TEXT NOT NULL,
ADD COLUMN     "memberUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ApplicationSubmissionComment" ADD CONSTRAINT "ApplicationSubmissionComment_memberProjectId_memberUserId_fkey" FOREIGN KEY ("memberProjectId", "memberUserId") REFERENCES "Member"("projectId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
