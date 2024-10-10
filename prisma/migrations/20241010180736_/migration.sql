/*
  Warnings:

  - Added the required column `school` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "school" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
