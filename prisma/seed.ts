import { prisma } from "~/server/db";
import {
  deleteApplicationSubmissionAnswers,
  deleteApplicationSubmissions,
  deleteProjects,
  seedProjects,
} from "./seedFiles/projectSeed";
import { deleteUsers, seedUsers } from "./seedFiles/userSeed";

async function cleanupDb() {
  await prisma.$transaction([
    deleteApplicationSubmissionAnswers,
    deleteApplicationSubmissions,
  ]);
  await prisma.$transaction([deleteProjects, deleteUsers]);
}

async function main() {
  await cleanupDb();
  await seedUsers();
  await seedProjects();
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
