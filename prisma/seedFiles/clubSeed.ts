import { SocialMediaPlatformType } from "@prisma/client";

import { prisma } from "~/server/db";
import { randomNumberBetweenInclusive } from "~/utils/helpers";

import type { Prisma } from "@prisma/client";

const generateRandomSocialMedia = () => {
  const socialMediaPlatforms: Array<SocialMediaPlatformType> = Object.values(
    SocialMediaPlatformType,
  );
  const socialMediaObjects: Array<Prisma.SocialMediaCreateWithoutClubInput> =
    [];

  const numSocialMedias = randomNumberBetweenInclusive(
    0,
    socialMediaPlatforms.length * 2,
  );
  for (let i = 0; i < numSocialMedias; i++) {
    const randomPlatform = socialMediaPlatforms[
      randomNumberBetweenInclusive(0, socialMediaPlatforms.length - 1)
    ] as SocialMediaPlatformType;
    const socialMediaObj = {
      platform: randomPlatform,
      url: `https://${randomPlatform.toLowerCase()}.com/${i}`,
    };
    socialMediaObjects.push(socialMediaObj);
  }

  return socialMediaObjects;
};

const generateRandomEvents = () => {
  const numEvents = randomNumberBetweenInclusive(0, 10);
  const events: Array<Prisma.ClubEventCreateWithoutClubInput>= [];

  for (let i = 0; i < numEvents; i++) {
    const inPerson = randomNumberBetweenInclusive(0, 40) > 5;
    const date =
      randomNumberBetweenInclusive(0, 40) > 10
        ? new Date()
        : new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const event = {
      name: `Event ${i}`,
      description: `Description for event ${i}`,
      date,
      inPerson,
      location: inPerson ? "Test Location" : "google.com",
    };
    events.push(event);
  }
  return events;
};

//TODO: implement later
//const generateRandomClubMembers = () => {return []};

const mockClubs: Array<Prisma.ClubCreateInput> = [
  {
    name: "Tech Wizards",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Artistic Expression",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Eco Warriors",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Adventure Seekers",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Health and Fitness Enthusiasts",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Debate and Discourse Society",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Music and Melodies",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Culinary Explorers",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Film Fanatics",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
  {
    name: "Literary Society",
    socialMedia: { create: generateRandomSocialMedia() },
    clubApplications: {},
    events: { create: generateRandomEvents() },
    clubProfile: { create: {} },
  },
];

export const seedClubs = async () => {
  for (const club of mockClubs) {
    await prisma.club.create({
      data: {
        ...club,
      },
    });
  }
};

export const deleteClubs = prisma.club.deleteMany({});
