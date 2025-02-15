import { faker } from "@faker-js/faker";
import {
  ApplicationQuestionType,
  ApplicationStatus,
  ApplicationSubmissionStatus,
  School,
  SocialMediaPlatformType,
  UserType,
} from "@prisma/client";

import { prisma } from "~/server/db";
import { randomNumberBetweenInclusive } from "~/utils/helpers";

import type {
  Application,
  ApplicationQuestion,
  Prisma,
  User,
} from "@prisma/client";

function getRandomDate(startDate: Date = new Date("2025-01-01"), endDate: Date = new Date()): Date {
  return faker.date.between({ from: startDate, to: endDate });
}

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
    const start =
      randomNumberBetweenInclusive(0, 40) > 10
        ? faker.date.future()
        : faker.date.past();
    const end = start;
    end.setHours(end.getHours() + 2);

    const event = {
      name: faker.lorem.words({ min: 3, max: 5 }),
      description: faker.lorem.paragraph({ min: 2, max: 5 }),
      start,
      end,
      inPerson,
      location: inPerson ? faker.location.city() : faker.internet.domainName(),
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
      phone: faker.phone.number(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: faker.person.jobType(),
    };
    contactInfos.push(contactInfo);
  }

  return contactInfos;
};

const generateRandomColors = () => {
  prisma.colors.create({
    data: {
      id: "default",
      primaryColor: "#1746A2",
      secondaryColor: "#5F9DF7",
    },
  });

  const colorsOptions = [
    {
      primaryColor: "#FF6500",
      secondaryColor: "#1E3E62",
    },
    {
      primaryColor: "#640D5F",
      secondaryColor: "#D91656",
    },
    {
      primaryColor: "#384B70",
      secondaryColor: "#507687",
    },
    {
      primaryColor: "#FF885B",
      secondaryColor: "#FFE5CF",
    },
    {
      primaryColor: "#7695FF",
      secondaryColor: "#9DBDFF",
    },
  ];

  const colorsIndex = randomNumberBetweenInclusive(0, colorsOptions.length - 1);

  const colors: Prisma.ColorsCreateWithoutProjectInput = {
    primaryColor: colorsOptions[colorsIndex]!.primaryColor,
    secondaryColor: colorsOptions[colorsIndex]!.secondaryColor,
  };

  return colors;
};

const generateRandomQuestions = (
  numQuestions: number = randomNumberBetweenInclusive(2, 5),
) => {
  const questions: Array<Prisma.ApplicationQuestionCreateWithoutApplicationInput> =
    [];

  for (let i = 0; i < numQuestions; i++) {
    const questionType = randomNumberBetweenInclusive(0, 100);
    let question;

    if (questionType < 25) {
      question = {
        id: faker.string.uuid(),
        orderNumber: i,
        question: faker.lorem.words({ min: 10, max: 25 }),
        required: randomNumberBetweenInclusive(0, 100) > 50,
        type: ApplicationQuestionType.TEXT_FIELD,
      };
    } else if (questionType < 50) {
      question = {
        id: faker.string.uuid(),
        orderNumber: i,
        question: faker.lorem.words({ min: 10, max: 25 }),
        required: randomNumberBetweenInclusive(0, 100) > 50,
        type: ApplicationQuestionType.TEXT_INPUT,
      };
    } else if (questionType < 75) {
      let answerChoices: string[] = [];
      for (let i = 0; i < 4; i++) {
        answerChoices.push(faker.lorem.words({ min: 3, max: 10 }));
      }

      question = {
        id: faker.string.uuid(),
        orderNumber: i,
        question: faker.lorem.words({ min: 10, max: 25 }),
        required: randomNumberBetweenInclusive(0, 100) > 50,
        answerChoices,
        type: ApplicationQuestionType.MULTIPLE_CHOICE,
      };
    } else {
      let answerChoices: string[] = [];
      for (let i = 0; i < 4; i++) {
        answerChoices.push(faker.lorem.words({ min: 3, max: 10 }));
      }

      question = {
        id: faker.string.uuid(),
        orderNumber: i,
        question: faker.lorem.words({ min: 10, max: 25 }),
        required: randomNumberBetweenInclusive(0, 100) > 50,
        answerChoices,
        type: ApplicationQuestionType.MULTIPLE_SELECT,
      };
    }

    questions.push(question);
  }

  return questions;
};

const generateRandomApplications = (users: User[]) => {
  const numApplications: number = randomNumberBetweenInclusive(0, 4);
  const applications: Array<Prisma.ApplicationCreateWithoutProjectInput> = [];
  let deadline: Date | null = getRandomDate();

  const randomSkills = randomNumberBetweenInclusive(2, 4);
  let desiredSkills: string[] = [];
  for (let i = 0; i < randomSkills; i++) {
    let word = faker.lorem.word();
    word = word.charAt(0) + word.slice(1);
    desiredSkills.push(word);
  }

  for (let i = 0; i < numApplications; i++) {
    const applicationId = faker.string.uuid();
    const questions = generateRandomQuestions();
    const date = getRandomDate();

    const application: Prisma.ApplicationCreateWithoutProjectInput = {
      id: applicationId,
      name: faker.person.jobTitle(),
      description: faker.lorem.paragraph({ min: 1, max: 4 }),
      status:
        randomNumberBetweenInclusive(0, 100) < 50
          ? ApplicationStatus.OPEN
          : ApplicationStatus.CLOSED,
      deadline,
      desiredSkills,
      questions: { create: questions },
      createdAt: date,
      updatedAt: date,
    };

    applications.push(application);
  }

  return applications;
};

const generateRandomApplicationSubmissions = (
  application: Application,
  users: User[],
) => {
  const numSubmissions = randomNumberBetweenInclusive(0, 25);
  let applicationSubmissions: Prisma.ApplicationSubmissionCreateInput[] = [];

  for (let i = 0; i < numSubmissions; i++) {
    const userIndex = randomNumberBetweenInclusive(0, 99);
    const user = users[userIndex];
    const date = getRandomDate(application.createdAt);

    const applicationSubmission = {
      id: faker.string.uuid(),
      user: { connect: { userId: user!.userId } },
      application: { connect: { id: application.id } },
      applicationSubmissionStatus: ApplicationSubmissionStatus.SUBMITTED,
      createdAt: date,
      updatedAt: date,
    };

    applicationSubmissions.push(applicationSubmission);
  }

  return applicationSubmissions;
};

const generateRandomApplicationSubmissionAnswers = (
  questions: ApplicationQuestion[],
  applicationSubmissionId: string,
) => {
  const applicationSubmissionAnswers: Prisma.ApplicationSubmissionAnswerCreateManyInput[] =
    [];

  for (const question of questions) {
    if (question.type === ApplicationQuestionType.TEXT_INPUT) {
      applicationSubmissionAnswers.push({
        id: faker.string.uuid(),
        answer: { answer: faker.lorem.lines({ min: 1, max: 2 }) },
        applicationSubmissionId,
        applicationQuestionId: question.id!,
      });
    } else if (question.type === ApplicationQuestionType.TEXT_FIELD) {
      applicationSubmissionAnswers.push({
        id: faker.string.uuid(),
        answer: { answer: faker.lorem.lines({ min: 1, max: 2 }) },
        applicationSubmissionId,
        applicationQuestionId: question.id!,
      });
    } else if (
      question.type === ApplicationQuestionType.MULTIPLE_CHOICE &&
      question.answerChoices.length > 0
    ) {
      const answerIndex = randomNumberBetweenInclusive(
        0,
        question.answerChoices.length - 1,
      );
      applicationSubmissionAnswers.push({
        id: faker.string.uuid(),
        answer: { answer: question.answerChoices[answerIndex] },
        applicationSubmissionId,
        applicationQuestionId: question.id!,
      });
    } else if (
      question.type === ApplicationQuestionType.MULTIPLE_SELECT &&
      question.answerChoices.length > 0
    ) {
      const answerIndex = randomNumberBetweenInclusive(
        0,
        question.answerChoices.length - 1,
      );
      applicationSubmissionAnswers.push({
        id: faker.string.uuid(),
        answer: { answer: question.answerChoices[answerIndex] },
        applicationSubmissionId,
        applicationQuestionId: question.id!,
      });
    }
  }

  return applicationSubmissionAnswers;
};

const generateRandomUsers = () => {
  const users: User[] = [];

  for (let i = 0; i < 100; i++) {
    const date = getRandomDate();

    const user: User = {
      userId: faker.string.uuid(),
      externalId: faker.string.nanoid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      emailAddress: faker.internet.email(),
      userType: UserType.INCOMPLETE,
      createdAt: date,
      updatedAt: date,
    };
    users.push(user);
  }
  return users;
};

const generateRandomProjects = (numProjects: number = 20) => {
  return Array.from({ length: numProjects }, () => ({
    name: faker.company.name(),
    description: faker.lorem.paragraph({ min: 1, max: 3 }),
    school: faker.helpers.arrayElement(Object.values(School)),
    socialMedia: { create: generateRandomSocialMedia() },
    applications: { create: generateRandomApplications(generateRandomUsers()) },
    events: { create: generateRandomEvents() },
    contactInfo: { create: generateRandomContactInfos() },
    colors: { create: generateRandomColors() },
    isVisible: true,
  }));
};

export const seedProjects = async () => {
  const mockUsers = generateRandomUsers();
  const mockProjects = generateRandomProjects();

  await prisma.user.createMany({
    data: mockUsers,
    skipDuplicates: true,
  });

  for (const project of mockProjects) {
    const date = getRandomDate();
    await prisma.project.create({
      data: {
        ...project,
        createdAt: date,
        updatedAt: date,
      },
    });

    const applications = project.applications?.create as (Application & {
      questions: Prisma.ApplicationQuestionUncheckedCreateNestedManyWithoutApplicationInput;
    })[];

    for (const application of applications) {
      const questions = application.questions?.create as ApplicationQuestion[];
      const applicationSubmissions = generateRandomApplicationSubmissions(
        application,
        mockUsers,
      );

      for (const applicationSubmission of applicationSubmissions) {
        const createdApplicationSubmission =
          await prisma.applicationSubmission.create({
            data: {
              ...applicationSubmission,
            },
          });

        const applicationSubmissionAnswers =
          generateRandomApplicationSubmissionAnswers(
            questions,
            createdApplicationSubmission.id,
          );

        for (const applicationSubmissionAnswer of applicationSubmissionAnswers) {
          await prisma.applicationSubmissionAnswer.create({
            data: {
              ...applicationSubmissionAnswer,
            },
          });
        }
      }
    }
  }
};

export const deleteProjects = prisma.project.deleteMany({});

export const deleteApplicationSubmissionComments =
  prisma.applicationSubmissionComment.deleteMany({});
export const deleteApplicationSubmissionEvaluation =
  prisma.applicationSubmissionEvaluation.deleteMany({});
export const deleteApplicationSubmissionAnswers =
  prisma.applicationSubmissionAnswer.deleteMany({});
export const deleteApplicationSubmissions =
  prisma.applicationSubmission.deleteMany({});
