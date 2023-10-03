-- CreateTable
CREATE TABLE "ClubApplicationAnswer" (
    "id" TEXT NOT NULL,
    "answerChoice" TEXT NOT NULL,
    "clubApplicationQuestionId" TEXT NOT NULL,

    CONSTRAINT "ClubApplicationAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubApplicationAnswer" ADD CONSTRAINT "ClubApplicationAnswer_clubApplicationQuestionId_fkey" FOREIGN KEY ("clubApplicationQuestionId") REFERENCES "ClubApplicationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
