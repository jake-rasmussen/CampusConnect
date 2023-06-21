/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ClubApplication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ClubApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubApplication" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ClubApplication_name_key" ON "ClubApplication"("name");
