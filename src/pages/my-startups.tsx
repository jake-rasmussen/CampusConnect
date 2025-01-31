import { Input } from "@nextui-org/input";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { Colors, Project, ProjectMemberType } from "@prisma/client";
import Error from "next/error";
import React, { useEffect, useState } from "react";

import StartupCard from "~/components/allProjects/startupCard";
import LoadingPage from "~/components/loadingPage";
import CreateProjectEditor from "~/components/my-startups/createProjectEditor";
import PageWrapper from "~/components/pageWrapper";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "./_app";

const MyStartups: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9; // Number of projects per page

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const [displayedProjects, setDisplayedProjects] = useState<
    [
      Project & {
        colors: Colors;
      },
      ProjectMemberType,
    ][]
  >([]);

  useEffect(() => {
    const combinedProjects: [
      Project & {
        colors: Colors;
      },
      ProjectMemberType,
    ][] = [];
    if (adminProjects && evaluatorProjects) {
      adminProjects.forEach((project) =>
        combinedProjects.push([project, ProjectMemberType.ADMIN]),
      );
      evaluatorProjects.forEach((project) =>
        combinedProjects.push([project, ProjectMemberType.EVALUATOR]),
      );

      combinedProjects.sort((a, b) => a[0].name.localeCompare(b[0].name));

      const filteredProjects = combinedProjects.filter(([project]) =>
        project.name.toLowerCase().includes(query.toLowerCase()),
      );

      const paginatedProjects = filteredProjects.slice(
        (page - 1) * limit,
        page * limit,
      );

      setDisplayedProjects(paginatedProjects);
    }
  }, [adminProjects, evaluatorProjects, query, page]);

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
    const totalProjects =
      (adminProjects?.length || 0) + (evaluatorProjects?.length || 0);
    const totalPages = Math.ceil(totalProjects / limit);

    return (
      <PageWrapper title="My Startups">
        <div className="flex w-full flex-col items-center gap-8">
          {totalProjects > 0 && false ? (
            <>
              <section className="min-w-2xl flex w-full max-w-2xl flex-row items-end gap-4">
                <Input
                  label="Search Startups"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1); // Reset to the first page when searching
                  }}
                  variant="underlined"
                />

                <div>
                  <CreateProjectEditor />
                </div>
              </section>

              <div className="flex w-full max-w-6xl flex-wrap items-center justify-center">
                {displayedProjects.map(([project, type], index) => (
                  <StartupCard project={project} role={type} key={index} />
                ))}
              </div>

              {totalProjects > limit && (
                <Pagination
                  total={totalPages}
                  initialPage={1}
                  page={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              )}
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-bold leading-none">
                You are not an admin in any startups!
              </h1>
              <p className="max-w-lg text-center text-lg">
                If you believe this is a mistake, please reach out to the
                respective startup owner for clarification.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <CreateProjectEditor />
                <Button onPress={onOpen}>Learn more</Button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader>Start Your Own Startup!</ModalHeader>
                        <ModalBody>
                          Creating your startup with Campus Connect is easy and
                          completely free. Build a professional homepage, gain
                          visibility, and attract the right talent to grow your
                          venture.
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Cancel
                          </Button>
                          <CreateProjectEditor />
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </>
          )}
        </div>
      </PageWrapper>
    );
  }
};

MyStartups.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyStartups;
