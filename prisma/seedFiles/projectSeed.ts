import { faker } from "@faker-js/faker";
import {
  ApplicationQuestionType,
  ApplicationStatus,
  SocialMediaPlatformType,
} from "@prisma/client";

import { prisma } from "~/server/db";
import { randomNumberBetweenInclusive } from "~/utils/helpers";

import type { Prisma } from "@prisma/client";

//TODO: Break this file up into smaller files

const generateRandomSocialMedia = (numSocialMedias?: number) => {
  const socialMediaPlatforms: Array<SocialMediaPlatformType> = Object.values(
    SocialMediaPlatformType,
  );

  if (numSocialMedias && numSocialMedias < 0) {
    throw new Error("Cannot less than 0");
  }

  numSocialMedias =
    numSocialMedias ||
    randomNumberBetweenInclusive(0, socialMediaPlatforms.length * 2);

  const socialMediaObjects: Array<Prisma.SocialMediaCreateWithoutProjectInput> =
    [];

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

const generateRandomEvents = (
  numEvents: number = randomNumberBetweenInclusive(0, 10),
) => {
  const events: Array<Prisma.EventCreateWithoutProjectInput> = [];

  for (let i = 0; i < numEvents; i++) {
    const inPerson = randomNumberBetweenInclusive(0, 40) > 5;
    const date =
      randomNumberBetweenInclusive(0, 40) > 10
        ? faker.date.future()
        : faker.date.past();
    const event = {
      name: faker.lorem.words({ min: 3, max: 5 }),
      description: faker.lorem.paragraph({ min: 2, max: 5 }),
      date,
      inPerson,
      location: inPerson ? "Test Location" : "google.com",
    };
    events.push(event);
  }
  return events;
};

const generateRandomContactInfos = (
  numContactInfos: number = randomNumberBetweenInclusive(0, 5),
) => {
  const contactInfos: Array<Prisma.ContactInfoCreateWithoutProjectInput> = [];

  for (let i = 0; i < numContactInfos; i++) {
    const contactInfo = {
      email: faker.internet.email(),
      phone:
        randomNumberBetweenInclusive(0, 100) > 50 ? faker.phone.number() : null,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: faker.person.jobType(),
    };
    contactInfos.push(contactInfo);
  }

  return contactInfos;
};

const generateRandomQuestions = (
  numQuestions: number = randomNumberBetweenInclusive(0, 5),
) => {
  const questions: Array<Prisma.ApplicationQuestionCreateWithoutApplicationInput> =
    [];

  for (let i = 0; i < numQuestions; i++) {
    const question = {
      orderNumber: i,
      question: faker.lorem.words({ min: 10, max: 25 }),
      required: randomNumberBetweenInclusive(0, 100) > 50,
      type: ApplicationQuestionType.TEXT_FIELD,
    };
    questions.push(question);
  }

  return questions;
};

const generateRandomApplications = (
  numApplications: number = randomNumberBetweenInclusive(0, 4),
) => {
  const applications: Array<Prisma.ApplicationCreateWithoutProjectInput> = [];
  const applicationStatusProb = randomNumberBetweenInclusive(0, 100);
  let status: ApplicationStatus;
  let deadline: Date | null = null;
  if (applicationStatusProb < 50) {
    status = ApplicationStatus.DRAFT;
  } else if (applicationStatusProb < 90) {
    status = ApplicationStatus.OPEN;
    deadline = faker.date.future({ years: 1 });
  } else {
    status = ApplicationStatus.CLOSED;
    deadline = faker.date.past();
  }

  for (let i = 0; i < numApplications; i++) {
    const application = {
      name: faker.person.jobTitle(),
      description: faker.lorem.paragraph({ min: 1, max: 4 }),
      status,
      deadline,
      questions: { create: generateRandomQuestions() },
      scoringCriteria: {}, //TODO: Generate scoring criteria same way as questions
    };
    applications.push(application);
  }

  return applications;
};

const createMockProjectArray = () => {
  const mockProjects: Array<Prisma.ProjectCreateInput> = [];
  const names = [
    "Tech Wizards",
    "Artistic Expression",
    "Eco Warriors",
    "Adventure Seekers",
    "Health and Fitness Enthusiasts",
    "Debate and Discourse Society",
    "Music and Melodies",
    "Culinary Explorers",
    "Film Fanatics",
    "Literary Society",
  ];

  for (const name of names) {
    const project = {
      name,
      socialMedia: { create: generateRandomSocialMedia() },
      description: faker.lorem.paragraph({ min: 0, max: 3 }),
      applications: { create: generateRandomApplications() },
      events: { create: generateRandomEvents() },
      contactInfo: { create: generateRandomContactInfos() },
    };
    mockProjects.push(project);
  }
  return mockProjects;
};

export const seedProjects = async () => {
  const mockProjects = createMockProjectArray();

  for (const project of mockProjects) {
    await prisma.project.create({
      data: {
        ...project,
      },
    });
  }
};

export const deleteProjects = prisma.project.deleteMany({});

export const deleteApplicationSubmissionAnswers =
  prisma.applicationSubmissionAnswer.deleteMany({});
export const deleteApplicationSubmissions =
  prisma.applicationSubmission.deleteMany({});
