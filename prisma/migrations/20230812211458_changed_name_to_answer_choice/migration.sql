/*
  Warnings:

  - You are about to drop the `ClubApplicationAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClubApplicationAnswer" DROP CONSTRAINT "ClubApplicationAnswer_clubApplicationQuestionId_fkey";

-- DropTable
DROP TABLE "ClubApplicationAnswer";

-- CreateTable
CREATE TABLE "ClubApplicationAnswerChoice" (
    "id" TEXT NOT NULL,
    "answerChoice" TEXT NOT NULL,
    "clubApplicationQuestionId" TEXT NOT NULL,

    CONSTRAINT "ClubApplicationAnswerChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" ADD CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationQuestionId_fkey" FOREIGN KEY ("clubApplicationQuestionId") REFERENCES "ClubApplicationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
