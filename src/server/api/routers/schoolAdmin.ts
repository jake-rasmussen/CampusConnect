import { z } from "zod";
import { isSchoolAdmin, t } from "../trpc";
import { prisma } from "~/server/db";
import { School } from "@prisma/client";

export const schoolAdminRouter = t.router({
  getDashboardData: t.procedure
    .use(isSchoolAdmin)
    .query(async ({ ctx }) => {
      const school = School.JOHNS_HOPKINS_UNIVERSITY;

      // Fetch projects created over time
      const projectsOverTime = await prisma.project.groupBy({
        by: ["createdAt"],
        where: { school },
        _count: { id: true },
        orderBy: { createdAt: "asc" },
      });

      // Fetch applications created over time
      const applicationsOverTime = await prisma.application.groupBy({
        by: ["createdAt"],
        where: {
          project: { school },
        },
        _count: { id: true },
        orderBy: { createdAt: "asc" },
      });

      // Fetch application submission statuses
      const applicationSubmissionStatus = await prisma.applicationSubmission.groupBy({
        by: ["applicationSubmissionStatus"],
        where: {
          application: {
            project: { school },
          },
        },
        _count: { id: true },
      });

      // Fetch total applications submitted over time
      const totalSubmissions = await prisma.applicationSubmission.groupBy({
        by: ["createdAt"],
        where: {
          application: {
            project: { school },
          },
        },
        _count: { id: true },
        orderBy: { createdAt: "asc" },
      });

      return {
        projectsOverTime: projectsOverTime.map(({ createdAt, _count }) => ({
          date: createdAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
          count: _count.id,
        })),
        applicationsOverTime: applicationsOverTime.map(({ createdAt, _count }) => ({
          date: createdAt.toISOString().split("T")[0],
          count: _count.id,
        })),
        applicationSubmissionStatus: applicationSubmissionStatus.map(({ applicationSubmissionStatus, _count }) => ({
          status: applicationSubmissionStatus,
          count: _count.id,
        })),
        totalSubmissions: totalSubmissions.map(({ createdAt, _count }) => ({
          date: createdAt.toISOString().split("T")[0],
          count: _count.id,
        })),
      };
    }),
});
