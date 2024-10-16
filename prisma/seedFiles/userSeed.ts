import { clerkClient } from "@clerk/nextjs/server";
import { faker } from "@faker-js/faker";
import { Focus } from "@prisma/client";

import { prisma } from "~/server/db";

import type { Prisma } from "@prisma/client";

export const seedUsers = async () => {
  const users = await clerkClient.users.getUserList();
  const userList: Array<Prisma.UserCreateInput> = [];
  for (const user of users) {
    const { id, firstName, lastName, primaryEmailAddressId, emailAddresses } =
      user;
    const emailAddress = emailAddresses.find(
      (e) => e.id === primaryEmailAddressId,
    )?.emailAddress;

    const userObj = {
      externalId: id,
      firstName: firstName || "",
      lastName: lastName || "",
      emailAddress: emailAddress || "",
    };
    userList.push(userObj);
  }

  await prisma.user.createMany({
    data: userList,
    skipDuplicates: true,
  });
};

export const deleteUsers = prisma.user.deleteMany({});

export const seedProfiles = async () => {
  // Fetch all users from the database
  const users = await prisma.user.findMany();

  for (const user of users) {
    // Create the profile for each user
    const profile = await prisma.profile.create({
      data: {
        skills: Array.from({ length: 3 }, () => faker.hacker.verb()),
        about: faker.lorem.paragraph(),
        school: faker.company.name(),
        year: faker.helpers.arrayElement([
          "Freshman",
          "Sophomore",
          "Junior",
          "Senior",
          "Graduate",
        ]),
        majors: [faker.helpers.arrayElement(Object.values(Focus))],
        minors: faker.helpers.arrayElements(Object.values(Focus), 2),
        user: {
          connect: { userId: user.userId },
        },
      },
    });

    // Create related social media records for the profile
    await prisma.profileSocialMedia.createMany({
      data: [
        {
          profileId: profile.id,
          platform: "TWITTER",
          url: faker.internet.url(), // Random URL
        },
        {
          profileId: profile.id,
          platform: "LINKEDIN",
          url: faker.internet.url(), // Random URL
        },
        {
          profileId: profile.id,
          platform: "INSTAGRAM",
          url: faker.internet.url(), // Random URL
        },
      ],
    });
  }
};

// Function to delete all profiles and related social media records
export const deleteProfiles = prisma.profile.deleteMany({});
