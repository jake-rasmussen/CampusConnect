-- DropForeignKey
ALTER TABLE "ClubEvent" DROP CONSTRAINT "ClubEvent_clubId_fkey";

-- AddForeignKey
ALTER TABLE "ClubEvent" ADD CONSTRAINT "ClubEvent_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
