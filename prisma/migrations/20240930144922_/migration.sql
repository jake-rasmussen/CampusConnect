-- CreateTable
CREATE TABLE "Colors" (
    "id" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Colors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Colors_projectId_key" ON "Colors"("projectId");

-- AddForeignKey
ALTER TABLE "Colors" ADD CONSTRAINT "Colors_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
