import { clerkClient } from "@clerk/nextjs/server";

import { prisma } from "~/server/db";

export const seedUsers = async () => {
  const users = await clerkClient.users.getUserList();
  const userList = new Array(users.length);
  for (const user of users) {
    const { id, firstName, lastName, primaryEmailAddressId, emailAddresses } =
      user;
    const emailAddressObj = emailAddresses.find(
      (e) => e.id === primaryEmailAddressId,
    );
    const emailAddress = emailAddressObj?.emailAddress || "";
    const userObj = {
      externalId: id,
      firstName: firstName || "",
      lastName: lastName || "",
      emailAddress,
    };
    userList.push(userObj);

    await prisma.user.create({
      data: {
        externalId: id,
        firstName: firstName || "",
        lastName: lastName || "",
        emailAddress: emailAddress || "",
      },
    });
  }
  await prisma.user.createMany({
    data: userList,
    skipDuplicates: true,
  });
};

export const deleteUsers = prisma.user.deleteMany({});
