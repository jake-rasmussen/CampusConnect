import { Input } from "@heroui/input";
import { Pagination } from "@heroui/react";
import { School } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import StartupCard from "~/components/allProjects/startupCard";
import LoadingPage from "~/components/loadingPage";
import PageWrapper from "~/components/pageWrapper";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { uppercaseToCapitalize } from "~/utils/helpers";

import type { Colors, Project } from "@prisma/client";
import type { NextPageWithLayout } from "~/pages/_app";
import { LicenseOff, Rocket } from "tabler-icons-react";

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
        (selectedSchool
          ? project.school === selectedSchool
          : true && project.isVisible),
    );

    const paginatedProjects = filteredProjects.slice(
      (page - 1) * limit,
      page * limit,
    );

    const totalPages = Math.ceil(filteredProjects.length / limit);

    return (
      <PageWrapper title="All Startups">
        <>

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

            {filteredProjects.length > 0 ? (
              <>
                <div className="flex w-full max-w-6xl flex-wrap items-center justify-center gap-8">
                  {paginatedProjects.map((project, index) => (
                    <StartupCard project={project} key={index} />
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
              </>
            ) : (
              <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
                <Rocket className="h-44 w-44 text-secondary" />
                <h3 className="text-2xl font-semibold uppercase">
                  No startups found
                </h3>
              </div>
            )}
          </div>
        </>
      </PageWrapper>
    );
  }
};

AllProjects.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllProjects;
