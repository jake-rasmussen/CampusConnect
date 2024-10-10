import { clerkClient } from "@clerk/nextjs/server";

import { prisma } from "~/server/db";

import type { Prisma } from "@prisma/client";
import { faker } from '@faker-js/faker';

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
        userId: user.userId,
        skills: Array.from({ length: 3 }, () => faker.hacker.verb()), // Generate 3 random skills
        about: faker.lorem.paragraph(), // Random paragraph for about section
        school: faker.company.name(), // Random company name as a placeholder for school name
        year: faker.helpers.arrayElement(["Freshman", "Sophomore", "Junior", "Senior", "Graduate"]),
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