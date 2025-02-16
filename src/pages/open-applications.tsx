import { Input } from "@heroui/input";
import { Pagination, Select, SelectItem } from "@heroui/react";
import { Application, ApplicationQuestion, Project } from "@prisma/client";
import { ProjectContext } from "lib/context";
import { capitalize } from "lodash";
import Error from "next/error";
import { useContext, useEffect, useState } from "react";
import { LicenseOff } from "tabler-icons-react";

import ApplicationPreviewCard from "~/components/applications/applicationPreviewCard";
import LoadingPage from "~/components/loadingPage";
import PageWrapper from "~/components/pageWrapper";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const OpenApplications = () => {
  const [applications, setApplications] = useState<
    (Application & {
      questions: ApplicationQuestion[];
      project: Project | null;
    })[]
  >([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const limit = 9; // Number of applications per page

  const {
    data: openApplications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
    error: errorApplications,
  } = api.applicationRouter.getAllOpenApplications.useQuery();

  const {
    data: applicationSubmissions,
    isLoading: isLoadingApplicationSubmissions,
    isError: isErrorApplicationSubmissions,
    error: errorApplicationSubmissions,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  useEffect(() => {
    if (openApplications && applicationSubmissions) {
      const applications: (Application & {
        questions: ApplicationQuestion[];
        project: Project | null;
      })[] = [];

      let newSkills = [...skills]; // Create a copy to avoid direct mutation

      openApplications.forEach((application) => {
        const previousSubmission = applicationSubmissions.find(
          (applicationSubmission) =>
            applicationSubmission.applicationId === application.id
        );

        if (!previousSubmission && application) {
          applications.push(application);
          application.desiredSkills.forEach((skill) => {
            if (!newSkills.includes(skill)) {
              newSkills.push(skill);
            }
          });
        }
      });

      newSkills = newSkills.sort((a, b) => a.localeCompare(b));

      setSkills(newSkills);
      setApplications(applications);
    }
  }, [openApplications, applicationSubmissions]);

  const skillInFilter = (application: Application) => {
    if (filteredSkills.length === 0) return true;

    for (const skill of application.desiredSkills) {
      if (filteredSkills.includes(skill)) return true;
    }
    return false;
  };

  if (isLoadingApplications || isLoadingApplicationSubmissions) {
    return <LoadingPage />;
  } else if (isErrorApplications || isErrorApplicationSubmissions) {
    return (
      <Error
        statusCode={
          errorApplications?.data?.httpStatus ||
          errorApplicationSubmissions?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    const filteredApplications = applications.filter(
      (application) =>
        skillInFilter(application) &&
        application.name.toLowerCase().includes(query.toLowerCase()),
    );

    const paginatedApplications = filteredApplications.slice(
      (page - 1) * limit,
      page * limit,
    );

    const totalPages = Math.ceil(filteredApplications.length / limit);

    return (
      <PageWrapper title="Open Applications">
        <div className="flex w-full flex-col items-center gap-8">
          <div className="mx-auto flex w-full max-w-4xl items-center text-center">
            <Input
              label="Search Open Applications"
              variant="underlined"
              value={query}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
                setPage(1); // Reset to the first page when searching
              }}
            />
            <Select
              label="Select Skills"
              selectionMode="multiple"
              className="max-w-xs"
              variant="underlined"
              onChange={(e) => {
                const selectedSkills = e.target.value
                  .split(",")
                  .filter((skill) => skill !== "");
                if (selectedSkills.length === 0) {
                  setFilteredSkills([...skills]);
                } else {
                  setFilteredSkills([...selectedSkills]);
                }
              }}
            >
              {skills.map((skill: string) => (
                <SelectItem
                  key={skill}
                >
                  {capitalize(skill)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full items-center justify-center">
            {openApplications.length > 0 ? (
              <div className="flex max-w-7xl flex-wrap justify-center gap-4">
                {paginatedApplications.map((application, index) => (
                  <ApplicationPreviewCard
                    application={application}
                    projectId={application.projectId}
                    key={`application${index}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
                <LicenseOff className="h-40 w-40" />
                <h3 className="text-2xl font-semibold uppercase">
                  There are no open applications
                </h3>
              </div>
            )}
          </div>

          {filteredApplications.length > limit && (
            <Pagination
              total={totalPages}
              initialPage={1}
              page={page}
              onChange={(newPage) => setPage(newPage)}
            />
          )}
        </div>
      </PageWrapper>
    );
  }
};

OpenApplications.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default OpenApplications;
