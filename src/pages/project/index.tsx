import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { School } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import ProjectCard from "~/components/allProjects/projectCard";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { uppercaseToCapitalize } from "~/utils/helpers";

import type { Colors, Project } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";

const AllProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School>();

  const [projects, setProjects] = useState<
    Array<
      Project & {
        colors: Colors;
      }
    >
  >([]);

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

        <section className="flex w-full max-w-2xl px-4">
          <Input
            label="Search Startups"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            variant="underlined"
          />
          <Autocomplete
            label="Select School"
            className="max-w-xs"
            variant="underlined"
            onSelectionChange={(e) => {
              setSelectedSchool(e as School);
            }}
          >
            {Object.values(School).map((school: School) => (
              <AutocompleteItem key={school}>
                {uppercaseToCapitalize(school)}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </section>

        <div className="m-10 flex w-full max-w-6xl flex-wrap items-center justify-center">
          {projects
            .filter(
              (project) =>
                project.name.toLowerCase().includes(query.toLowerCase()) &&
                (selectedSchool ? project.school === selectedSchool : true),
            )
            .map((project, index) => (
              <ProjectCard
                projectId={project.id}
                name={project.name}
                colors={project.colors}
                school={project.school}
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
