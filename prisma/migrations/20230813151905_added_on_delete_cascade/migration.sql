-- DropForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" DROP CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationQuestionId_fkey";

-- AddForeignKey
ALTER TABLE "ClubApplicationAnswerChoice" ADD CONSTRAINT "ClubApplicationAnswerChoice_clubApplicationQuestionId_fkey" FOREIGN KEY ("clubApplicationQuestionId") REFERENCES "ClubApplicationQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
