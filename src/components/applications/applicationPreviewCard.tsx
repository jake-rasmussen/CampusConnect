import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Application, ApplicationQuestion, Project } from "@prisma/client";
import Link from "next/link";
import { Eye } from "tabler-icons-react";

import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import { MovingBorder } from "../aceternity-ui/moving-border";

type PropType = {
  application: Application & {
    questions: ApplicationQuestion[];
    project: Project | null;
  };
  projectId: string | null;
};

const ApplicationPreviewCard = (props: PropType) => {
  const { application } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="group relative h-fit w-[20rem] overflow-hidden rounded-2xl p-[3px] md:w-[25rem]">
      <div className="absolute inset-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <MovingBorder duration={3000} rx="30%" ry="30%">
          <div className="h-80 w-80 bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>

      <Card className="relative mb-0 flex w-full flex-col bg-white shadow-xl">
        <div
          onClick={onOpen}
          className="absolute z-10 h-full w-full opacity-0 transition duration-300 ease-in-out group-hover:cursor-pointer group-hover:opacity-100"
        >
          <div className="flex h-full w-full select-none items-center justify-center bg-white bg-opacity-50">
            <Eye className="h-[5rem] w-[5rem] transition duration-300 ease-in-out" />
          </div>
        </div>

        <CardHeader className="flex flex-col items-start justify-start py-4 font-bold">
          <h1 className="font-black">{application.name}</h1>
          <h4 className="font-semibold">{application.project?.name}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <p>{application.description}</p>
          {application.desiredSkills.length > 0 && (
            <div className="mx-auto">
              <div className="flex flex-wrap gap-2">
                {application.desiredSkills.map(
                  (skill: string, index: number) => (
                    <Chip
                      className="h-[2rem] bg-secondary capitalize text-white hover:cursor-pointer"
                      key={`skillBadge${index}`}
                    >
                      {skill}
                    </Chip>
                  ),
                )}
              </div>
            </div>
          )}
        </CardBody>
        {application.deadline && (
          <>
            <Divider />
            <CardFooter className="text-sm">
              Deadline:&nbsp;
              <span className="font-semibold">
                {application.deadline.toLocaleDateString(
                  undefined,
                  DATE_TIME_FORMAT_OPTS,
                )}
              </span>
            </CardFooter>
          </>
        )}

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Preview Application
                </ModalHeader>
                <ModalBody>
                  <div>
                    {application.project ? (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <h3 className="tracking-none text-xl font-black uppercase">
                          {application.project.name}
                        </h3>
                        <p className="mx-10 py-2">
                          {application.project.description}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Link
                    href={`/project/${application.projectId}/apply/${application.id}`}
                  >
                    <Button color="primary" onPress={onClose}>
                      Apply
                    </Button>
                  </Link>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Card>
    </main>
  );
};

export default ApplicationPreviewCard;
