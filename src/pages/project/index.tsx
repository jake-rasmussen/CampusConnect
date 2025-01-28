import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/react";
import { School } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import StartupCard from "~/components/allProjects/startupCard";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { uppercaseToCapitalize } from "~/utils/helpers";

import type { Colors, Project } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";
import PageWrapper from "~/components/pageWrapper";

const AllProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School>();
  const [page, setPage] = useState(1);
  const limit = 9; // Number of projects per page

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
  }, [projectsData]);

  if (projectsIsLoading) {
    return <LoadingPage />;
  } else if (projectsError) {
    return <Error statusCode={projectsError?.data?.httpStatus || 500} />;
  } else {
    const filteredProjects = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query.toLowerCase()) &&
        (selectedSchool ? project.school === selectedSchool : true)
    );

    const paginatedProjects = filteredProjects.slice(
      (page - 1) * limit,
      page * limit
    );

    const totalPages = Math.ceil(filteredProjects.length / limit);

    return (
      <PageWrapper title="All Startups">
        <div className="flex w-full flex-col items-center gap-8">
          <section className="flex w-full max-w-2xl">
            <Input
              label="Search Startups"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1); // Reset to the first page when searching
              }}
              variant="underlined"
            />
          </section>

          <div className="flex w-full max-w-6xl flex-wrap items-center justify-center gap-8">
            {paginatedProjects.map((project, index) => (
              <StartupCard
                project={project}
                key={index}
              />
            ))}
          </div>

          {filteredProjects.length > limit && (
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

AllProjects.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllProjects;
