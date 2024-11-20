import { Input } from "@nextui-org/input";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Project, ProjectMemberType } from "@prisma/client";
import Error from "next/error";
import React, { useEffect, useState } from "react";
import { NoteOff } from "tabler-icons-react";

import ProjectMemberCard from "~/components/allProjects/projectMemberCard";
import LoadingPage from "~/components/loadingPage";
import CreateProjectEditor from "~/components/my-projects/createProjectEditor";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "./_app";

const MyProjects: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<[Project, ProjectMemberType][]>([]);

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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            My Startups
          </h1>
        </section>

        {adminProjects.length > 0 || evaluatorProjects.length > 0 ? (
          <>
            <section className="w-full max-w-2xl px-4">
              <Input
                label="Search Startups"
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

            <section className="my-10">
              <CreateProjectEditor />
            </section>
          </>
        ) : (
          <section>
            <div className="mx-auto flex flex-col items-center justify-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl">
              <h1 className="text-4xl font-bold leading-none">
                You are not an admin or evaluator in any startups!
              </h1>
              <p className="mb-12 mt-8 px-8 text-lg">
                If you think this may be a mistake, please contact the venture
                owner
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <CreateProjectEditor />
                <Button onPress={onOpen}>Learn more</Button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Create your own startup!
                        </ModalHeader>
                        <ModalBody>
                          Get started with creating a venture! With Campus
                          Connect, creating a startup homepage is completely
                          free, and can help your startup gain visibility.
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
            </div>
          </section>
        )}
      </div>
    );
  }
};

MyProjects.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyProjects;
