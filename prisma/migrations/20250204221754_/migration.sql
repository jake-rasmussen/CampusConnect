-- AddForeignKey
ALTER TABLE "ProjectCreationForm" ADD CONSTRAINT "ProjectCreationForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
