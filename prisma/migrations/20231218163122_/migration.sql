/*
  Warnings:

  - The values [FILE_UPLOAD] on the enum `ApplicationQuestionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endDateTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationQuestionType_new" AS ENUM ('TEXT_INPUT', 'TEXT_FIELD', 'MULTIPLE_CHOICE', 'MULTIPLE_SELECT');
ALTER TABLE "ApplicationQuestion" ALTER COLUMN "type" TYPE "ApplicationQuestionType_new" USING ("type"::text::"ApplicationQuestionType_new");
ALTER TYPE "ApplicationQuestionType" RENAME TO "ApplicationQuestionType_old";
ALTER TYPE "ApplicationQuestionType_new" RENAME TO "ApplicationQuestionType";
DROP TYPE "ApplicationQuestionType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL;
