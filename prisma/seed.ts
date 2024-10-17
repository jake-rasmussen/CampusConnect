import { prisma } from "~/server/db";
import {
  deleteApplicationSubmissionAnswers,
  deleteApplicationSubmissions,
  deleteProjects,
  seedProjects,
} from "./seedFiles/projectSeed";
import {
  deleteProfiles,
  deleteUsers,
  seedProfiles,
  seedUsers,
} from "./seedFiles/userSeed";

async function cleanupDb() {
  // Pass the Prisma promises directly to $transaction
  await prisma.$transaction([
    deleteApplicationSubmissionAnswers,
    deleteApplicationSubmissions,
  ]);

  await prisma.$transaction([deleteProjects, deleteProfiles, deleteUsers]);
}
async function main() {
  await cleanupDb();
  await seedProjects();
  await seedUsers();
  await seedProfiles();
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
