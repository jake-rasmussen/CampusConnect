import Error from "next/error";
import { useEffect, useState } from "react";

import ProjectCard from "~/components/allProjects/projectCard";
import LoadingPage from "~/components/loadingPage";
import { Input } from "@nextui-org/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { Colors, Project } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";

const AllProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Array<Project & {
    colors: Colors;
  }>>([]);

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
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            All Projects
          </h1>
        </section>

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

        <div className="m-10 flex w-full max-w-6xl flex-wrap items-center justify-center">
          {projects
            .filter(
              (project) =>
                project.name.toLowerCase().includes(query.toLowerCase()) &&
                project.id !== "swec",
            )
            .map((project, index) => (
              <ProjectCard
                projectId={project.id}
                name={project.name}
                colors={project.colors}
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
