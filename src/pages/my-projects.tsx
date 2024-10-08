import { Project, ProjectMemberType } from "@prisma/client";
import Error from "next/error";
import React, { useEffect, useState } from "react";
import { NoteOff } from "tabler-icons-react";

import ProjectMemberCard from "~/components/allProjects/projectMemberCard";
import LoadingPage from "~/components/loadingPage";
import CreateProjectEditor from "~/components/my-projects/createProjectEditor";
import { Input } from "@nextui-org/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "./_app";
import { Divider } from "@nextui-org/react";

const MyProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<[Project, ProjectMemberType][]>([]);

  const {
    data: adminProjects,
    isLoading: isLoadingAdminProjects,
    isError: isErrorAdminProjects,
    error: errorAdminProjects,
  } = api.projectRouter.getAdminProjects.useQuery();

  const {
    data: evaluatorProjects,
    isLoading: isLoadingEvaluatorProjects,
    isError: isErrorEvaluatorProjects,
    error: errorEvaluatorProjects,
  } = api.projectRouter.getEvaluatorProjects.useQuery();

  useEffect(() => {
    const sortedProjects: [Project, ProjectMemberType][] = [];
    if (adminProjects && evaluatorProjects) {
      adminProjects.forEach((project) =>
        sortedProjects.push([project, ProjectMemberType.ADMIN]),
      );
      evaluatorProjects.forEach((project) =>
        sortedProjects.push([project, ProjectMemberType.EVALUATOR]),
      );

      sortedProjects.sort((a, b) => a[0].name.localeCompare(b[0].name));
      setProjects(sortedProjects);
    }
  }, [adminProjects, evaluatorProjects]);

  if (isLoadingAdminProjects || isLoadingEvaluatorProjects) {
    return <LoadingPage />;
  } else if (isErrorAdminProjects || isErrorEvaluatorProjects) {
    return (
      <Error
        statusCode={
          errorAdminProjects?.data?.httpStatus ||
          errorEvaluatorProjects?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            My Projects
          </h1>
        </section>

        {adminProjects.length > 0 || evaluatorProjects.length > 0 ? (
          <>
            <section className="w-full max-w-2xl px-4">
              <Input
                label="Search Projects"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                variant="underlined"
              />
            </section>

            <div className="m-10 flex w-full flex-wrap items-center justify-center">
              {projects
                .filter(([project, _]) =>
                  project.name.toLowerCase().includes(query.toLowerCase()),
                )
                .map(([project, type], index) => (
                  <ProjectMemberCard
                    projectId={project.id}
                    name={project.name}
                    role={type}
                    key={index}
                  />
                ))}
            </div>
          </>
        ) : (
          <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
            {/* <NoteOff className="h-44 w-44 text-secondary" /> */}
            <h3 className="text-2xl font-semibold uppercase">
              You are not an admin or evaluator in any projects!
            </h3>
            <Divider />
            <span className="mx-8 py-2 text-sm font-normal text-secondary">
              If you think this may be a mistake, please contact the project
              owner
            </span>
          </div>
        )}

        <section className="my-10">
          <CreateProjectEditor />
        </section>
      </div>
    );
  }
};

MyProjects.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyProjects;
