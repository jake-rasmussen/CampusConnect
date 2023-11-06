import Error from "next/error";
import { useEffect, useState } from "react";

import ProjectCard from "~/components/allProjects/projectCard";
import LoadingPage from "~/components/loadingPage";
import { Input } from "~/components/shadcn_ui/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { Project } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";

const AllProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Array<Project>>([]);

  const {
    data: projectsData,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = api.projectRouter.getAllProjects.useQuery();

  useEffect(() => {
    setProjects(projectsData || []);
  }, [projectsData, query]);

  if (projectsIsLoading) {
    return <LoadingPage />;
  } else if (projectsError) {
    return <Error statusCode={projectsError?.data?.httpStatus || 500} />;
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <section className="mb-14 mt-20">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            All Projects
          </h1>
        </section>

        <section className="w-full max-w-2xl px-4">
          <Input
            className="rounded-none border-x-0 border-b-2 border-t-0 border-secondary bg-transparent focus-visible:ring-0"
            placeholder={"Search"}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </section>

        <div className="m-10 flex w-full flex-wrap items-center justify-center">
          {projects
            .filter((project) =>
              project.name.toLowerCase().includes(query.toLowerCase()),
            )
            .map((project, index) => (
              <ProjectCard
                projectId={project.id}
                name={project.name}
                key={index}
              />
            ))}
        </div>
      </div>
    );
  }
};

AllProjects.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllProjects;
