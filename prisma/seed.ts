import { prisma } from "~/server/db";
import { seedUsers, deleteUsers } from "./seedFiles/userSeed";

async function cleanupDb() {
  await prisma.$transaction([
    deleteUsers,
  ]);

}

async function main() {
  await cleanupDb();
  return await seedUsers();
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
