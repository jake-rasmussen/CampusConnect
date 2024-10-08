import Link from "next/link";
import React from "react";

import { Card, CardBody } from "@nextui-org/card";
import { Colors } from "@prisma/client";

type PropTypes = {
  projectId: string;
  colors: Colors;
  name: string;
};

const ProjectCard = (props: PropTypes) => {
  const { projectId, colors, name } = props;

  return (
    <Card className="m-6 h-72 w-72 transition duration-300 ease-in-out hover:scale-110">
      <CardBody className="group mb-0 flex flex-col rounded-2xl bg-white shadow-xl m-0 p-0">
        <Link href={`/project/${projectId}`} className="h-full w-full">
          <header
            className="h-1/2 rounded-t-xl shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
            }}
          />
          <div className="flex h-1/2 flex-col text-center">
            <h1 className="tracking-none mt-8 text-xl font-black uppercase text-black">
              {name}
            </h1>
            <p className="text-gray-700 mb-8 flex grow items-end justify-center font-light transition duration-200 ease-in-out group-hover:text-secondary">
              Click to view project
            </p>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;