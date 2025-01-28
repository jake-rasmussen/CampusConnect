/*
  Warnings:

  - You are about to drop the column `projectId` on the `Colors` table. All the data in the column will be lost.
  - Added the required column `colorsId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Colors" DROP CONSTRAINT "Colors_projectId_fkey";

-- DropIndex
DROP INDEX "Colors_projectId_key";

-- AlterTable
ALTER TABLE "Colors" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "colorsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "Colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
