import { Card, CardBody } from "@heroui/card";
import { Chip, Divider } from "@heroui/react";
import { Colors, Project, ProjectMemberType, School } from "@prisma/client";
import Link from "next/link";
import React from "react";

import {
  dateToStringFormatted,
  dateToStringFormattedWithYear,
  uppercaseToCapitalize,
} from "~/utils/helpers";

type PropTypes = {
  project: Project & {
    colors: Colors;
  };
  school?: School; // Optional field for School
  role?: ProjectMemberType; // Optional field for ProjectMemberType
};

const StartupCard = (props: PropTypes) => {
  const { project, role } = props;

  return (
    <Card className="h-60 w-72 transition duration-300 ease-in-out hover:scale-110">
      <CardBody className="group m-0 mb-0 flex flex-col rounded-2xl bg-white p-0 shadow-xl">
        <Link
          href={
            role
              ? role === ProjectMemberType.ADMIN
                ? `/admin/${project.id}`
                : `/evaluator/${project.id}`
              : `/startups/${project.id}`
          }
          className="h-full w-full"
        >
          <header
            className="flex h-1/2 items-center justify-center rounded-t-xl text-center shadow-2xl"
            style={{
              backgroundImage: `linear-gradient(to right, ${project.colors.primaryColor}, ${project.colors.secondaryColor})`,
            }}
          >
            <h1 className="tracking-none text-xl font-black uppercase text-white">
              {project.name}
            </h1>
          </header>

          {role ? (
            <div className="relative flex grid h-1/2 grid-rows-5 flex-col text-center">
              <div className="row-span-3 mx-8 flex h-full items-center justify-center font-semibold">
                <p className="text-lg font-black">
                  {uppercaseToCapitalize(role)}
                </p>
              </div>
              <div className="row-span-2 flex flex-col items-center">
                <Divider className="w-5/6" />
                <div className="text-gray-700 mx-4 flex grow items-center justify-center font-light transition duration-200 ease-in-out group-hover:text-secondary">
                  <p>Click to view project</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex grid h-1/2 grid-rows-5 flex-col text-center">
              <div className="row-span-3 mx-8 flex h-full items-center justify-center font-semibold">
                <p>
                  Created{" "}
                  <span>
                    {dateToStringFormattedWithYear(project.createdAt)}
                  </span>
                </p>
              </div>
              <div className="row-span-2 flex flex-col items-center">
                <Divider className="w-5/6" />
                <div className="text-gray-700 mx-4 flex grow items-center justify-center font-light transition duration-200 ease-in-out group-hover:text-secondary">
                  <p>Click to view project</p>
                </div>
              </div>
            </div>
          )}
        </Link>
      </CardBody>
    </Card>
  );
};

export default StartupCard;
