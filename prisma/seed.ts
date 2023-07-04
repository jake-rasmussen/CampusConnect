import { prisma } from "~/server/db";
import { deleteClubs, seedClubs } from "./seedFiles/clubSeed";
import { deleteUsers, seedUsers } from "./seedFiles/userSeed";

async function cleanupDb() {
  await prisma.$transaction([deleteClubs, deleteUsers]);
}

async function main() {
  await cleanupDb();
  await seedUsers();
  await seedClubs();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
