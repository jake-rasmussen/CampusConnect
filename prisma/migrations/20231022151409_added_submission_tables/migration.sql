-- CreateTable
CREATE TABLE "ClubApplicationSubmission" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "clubApplicationId" TEXT NOT NULL,

    CONSTRAINT "ClubApplicationSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubApplicationSubmissionAnswer" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "selectedAnswers" TEXT[],
    "clubApplicationSubmissionId" TEXT NOT NULL,

    CONSTRAINT "ClubApplicationSubmissionAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClubApplicationSubmission" ADD CONSTRAINT "ClubApplicationSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplicationSubmission" ADD CONSTRAINT "ClubApplicationSubmission_clubApplicationId_fkey" FOREIGN KEY ("clubApplicationId") REFERENCES "ClubApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubApplicationSubmissionAnswer" ADD CONSTRAINT "ClubApplicationSubmissionAnswer_clubApplicationSubmissionI_fkey" FOREIGN KEY ("clubApplicationSubmissionId") REFERENCES "ClubApplicationSubmission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
