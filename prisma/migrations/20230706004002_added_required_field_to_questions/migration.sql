/*
  Warnings:

  - Added the required column `required` to the `ClubApplicationQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubApplicationQuestion" ADD COLUMN     "required" BOOLEAN NOT NULL;
