import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/react";
import { ProjectMemberType } from "@prisma/client";
import Link from "next/link";
import React from "react";

import { uppercaseToCapitalize } from "~/utils/helpers";

type PropTypes = {
  projectId: string;
  name: string;
  role: ProjectMemberType;
};

const ProjectMemberCard = (props: PropTypes) => {
  const { projectId, name, role } = props;

  return (
    <Card className="m-6 h-72 w-72 transition duration-300 ease-in-out hover:scale-110">
      <CardBody className="group m-0 mb-0 flex flex-col rounded-2xl bg-white p-0 shadow-xl">
        <Link
          href={
            role === ProjectMemberType.ADMIN
              ? `/admin/${projectId}`
              : `/evaluator/${projectId}`
          }
          className="h-full w-full"
        >
          <header className="h-1/2 rounded-t-xl bg-gradient-to-r from-primary to-secondary shadow-2xl" />
          <div className="flex h-1/2 flex-col items-center text-center">
            <h1 className="tracking-none mt-8 text-xl font-black uppercase text-black">
              {name}
            </h1>
            <Chip className="h-[2rem] bg-secondary capitalize text-white ">
              {uppercaseToCapitalize(role)}
            </Chip>
            <p className="text-gray-700 mb-8 flex grow items-end justify-center font-light  transition duration-200 ease-in-out group-hover:text-secondary ">
              Click to view more
            </p>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProjectMemberCard;
