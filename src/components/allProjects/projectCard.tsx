import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { Colors, School } from "@prisma/client";
import Link from "next/link";
import React from "react";

import { uppercaseToCapitalize } from "~/utils/helpers";

type PropTypes = {
  projectId: string;
  colors: Colors;
  name: string;
  school: School;
};

const ProjectCard = (props: PropTypes) => {
  const { projectId, colors, name, school } = props;

  return (
    <Card className="m-6 h-72 w-72 transition duration-300 ease-in-out hover:scale-110">
      <CardBody className="group m-0 mb-0 flex flex-col rounded-2xl bg-white p-0 shadow-xl">
        <Link href={`/project/${projectId}`} className="h-full w-full">
          <header
            className="flex h-1/2 items-center justify-center rounded-t-xl text-center shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
            }}
          >
            <h1 className="tracking-none text-xl font-black uppercase text-black text-white">
              {name}
            </h1>
          </header>

          <div className="relative flex grid h-1/2 grid-rows-5 flex-col text-center">
            <div className="row-span-3 mx-8 flex h-full items-center justify-center font-semibold">
              <p>{uppercaseToCapitalize(school)}</p>
            </div>
            <div className="row-span-2 flex flex-col items-center">
              <Divider className="w-5/6" />
              <div className="text-gray-700 mx-4 flex grow items-center justify-center font-light transition duration-200 ease-in-out group-hover:text-secondary">
                <p>Click to view project</p>
              </div>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
