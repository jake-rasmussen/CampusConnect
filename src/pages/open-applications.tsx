import { Application, ApplicationQuestion, Project } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";
import { LicenseOff } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import ApplicationPreviewCard from "~/components/applications/applicationPreviewCard";
import Header from "~/components/dashboard/header/header";
import LoadingPage from "~/components/loadingPage";
import { Badge } from "~/components/shadcn_ui/badge";
import { Separator } from "~/components/shadcn_ui/separator";
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
        <Header name={"Open Applications"} editable={false} />
        <section className="py-10">
          <div className="ml-4 flex flex-col items-center text-center">
            {skills.length > 0 && (
              <div className="max-w-4xl pb-8">
                <div className="mx-auto max-w-xs">
                  <h3 className="text-xl font-semibold uppercase text-black">
                    Filter
                  </h3>
                  <Separator
                    orientation="horizontal"
                    className="my-4 w-full bg-secondary"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {skills.map((skill: string, index: number) => (
                    <Badge
                      className={twMerge(
                        "h-[2rem] bg-secondary capitalize text-white shadow-xl transition duration-300 hover:cursor-pointer hover:text-white",
                        !filteredSkills.includes(skill) &&
                          "border border-primary bg-white text-primary",
                      )}
                      onClick={() => {
                        const updatedFilteredSkills = filteredSkills;
                        if (!filteredSkills.includes(skill)) {
                          updatedFilteredSkills.push(skill);
                        } else {
                          const index = updatedFilteredSkills.indexOf(skill);
                          updatedFilteredSkills.splice(index, 1);
                        }
                        setFilteredSkills([...updatedFilteredSkills]);
                      }}
                      key={`skillBadge${index}`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex w-full items-center justify-center ">
            {applications.length > 0 ? (
              <div className="flex max-w-7xl flex-wrap justify-center">
                <>
                  {applications.map((application, index) => (
                    <div key={`application${index}`}>
                      {(filteredSkills.length === 0 ||
                        (filteredSkills.length > 0 &&
                          skillInFilter(application))) && (
                        <ApplicationPreviewCard
                          application={application}
                          projectId={application.projectId}
                        />
                      )}
                    </div>
                  ))}
                </>
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
