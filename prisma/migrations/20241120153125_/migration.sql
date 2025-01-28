-- CreateTable
CREATE TABLE "ProjectCreationForm" (
    "id" TEXT NOT NULL,
    "validation" TEXT NOT NULL,
    "school" "School" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectCreationForm_pkey" PRIMARY KEY ("id")
);
