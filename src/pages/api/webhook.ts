import { clerkClient } from "@clerk/nextjs";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { Member, PrismaClient, ProjectMemberType, User } from "@prisma/client";
import { Webhook } from "svix";

import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { WebhookRequiredHeaders } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET!;
const prisma = new PrismaClient();

export const establishMetadata = async (
  user: User & {
    memberships: Member[];
  },
) => {
  const evaluatorProjectIds: string[] = [];
  const adminProjectIds: string[] = [];

  user.memberships.forEach((membership: Member) => {
    if (membership.type === ProjectMemberType.ADMIN) {
      adminProjectIds.push(membership.projectId);
    } else {
      evaluatorProjectIds.push(membership.projectId);
    }
  });

  await clerkClient.users.updateUserMetadata(user.externalId, {
    publicMetadata: {
      evaluatorProjectIds: JSON.stringify(evaluatorProjectIds),
      adminProjectIds: JSON.stringify(adminProjectIds),
      userType: user.userType,
    },
  });
};

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse,
) {
  const payload = JSON.stringify(req.body);
  const headers = req.headers;
  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headers) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return res.status(400).json({ error: "Invalid webhook signature" });
  }


  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, ...attributes } = evt.data;

    try {
      const user = await prisma.user.upsert({
        where: {
          externalId: id,
        },
        update: {
          emailAddress: attributes.email_addresses[0]?.email_address,
          firstName: attributes.first_name,
          lastName: attributes.last_name,
        },
        create: {
          externalId: id,
          emailAddress: attributes.email_addresses[0]?.email_address || "",
          firstName: attributes.first_name,
          lastName: attributes.last_name,
        },
        include: {
          memberships: true,
        },
      });

      await establishMetadata(user);
    } catch (_) {
      return res.status(400).json({ error: "Failed to create user and establish metadata" });
    }
  }

  if (eventType === "session.created") {
    const { user_id } = evt.data;

    try {
      const user = await prisma.user.findUnique({
        where: {
          externalId: user_id,
        },
        include: {
          memberships: true,
        },
      });

      if (user) await establishMetadata(user);
    } catch (_) {
      return res.status(400).json({ error: "Failed to create user and establish metadata" });
    }
  }

  return res.status(201).json({});
}

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};
