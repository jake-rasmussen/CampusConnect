import { clerkClient } from "@clerk/nextjs/server";

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
