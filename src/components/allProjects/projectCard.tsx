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
            className="h-1/2 rounded-t-xl shadow-2xl flex items-center justify-center text-center"
            style={{
              backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
            }}
          >
            <h1 className="tracking-none text-white text-xl font-black uppercase text-black">
              {name}
            </h1>
          </header>

          <div className="flex h-1/2 flex-col text-center relative grid grid-rows-5">
            <div className="row-span-3 font-semibold h-full flex justify-center items-center mx-8">
              <p>{uppercaseToCapitalize(school)}</p>
            </div>
            <div className="row-span-2 flex flex-col items-center">
              <Divider className="w-5/6" />
              <div className="text-gray-700 font-light transition duration-200 ease-in-out group-hover:text-secondary flex items-center grow justify-center mx-4">
                <p>
                  Click to view project
                </p>
              </div>
            </div>

          </div>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
