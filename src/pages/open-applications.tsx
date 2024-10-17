import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { Application, ApplicationQuestion, Project } from "@prisma/client";
import { capitalize } from "lodash";
import Error from "next/error";
import { useEffect, useState } from "react";
import { LicenseOff } from "tabler-icons-react";

import ApplicationPreviewCard from "~/components/applications/applicationPreviewCard";
import LoadingPage from "~/components/loadingPage";
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
      openApplications.forEach((application) => {
        const previousSubmission = applicationSubmissions.find(
          (applicationSubmission) =>
            applicationSubmission.applicationId === application.id,
        );
        if (!previousSubmission) {
          applications.push(application);
          application.desiredSkills.forEach((skill) => {
            const updatedSkills = skills;
            if (updatedSkills.indexOf(skill) === -1) {
              updatedSkills.push(skill);
            }
            setSkills(updatedSkills);
          });
        }
      });
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
    return (
      <main className="w-full">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Open Applications
          </h1>
        </section>

        <section className="m-10">
          <div className="mx-auto my-10 flex max-w-4xl items-center text-center">
            <Input
              label="Search Open Applications"
              variant="underlined"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
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
                  onSelectCapture={(skill) => console.log("SELECTED", skill)}
                >
                  {capitalize(skill)}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full items-center justify-center">
            {applications.length > 0 ? (
              <div className="flex max-w-7xl flex-wrap justify-center">
                {applications
                  .filter(
                    (application) =>
                      skillInFilter(application) &&
                      application.name
                        .toLowerCase()
                        .includes(query.toLowerCase()),
                  )
                  .map((application, index) => (
                    <ApplicationPreviewCard
                      application={application}
                      projectId={application.projectId}
                      key={`application${index}`}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
                <LicenseOff className="h-44 w-44 text-secondary" />
                <h3 className="text-2xl font-semibold uppercase">
                  There are no open applications
                </h3>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }
};

OpenApplications.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default OpenApplications;
