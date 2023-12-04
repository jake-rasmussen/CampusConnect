import { Application, ApplicationQuestion, Project } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { InfoSquare } from "tabler-icons-react";

import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import Button from "../button";
import { Badge } from "../shadcn_ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn_ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn_ui/dialog";
import { Separator } from "../shadcn_ui/separator";

type PropType = {
  application: Application & {
    questions: ApplicationQuestion[];
    project: Project | null;
  };
  projectId: string | null;
};

const ApplicationPreviewCard = (props: PropType) => {
  const { application } = props;

  const router = useRouter();

  return (
    <Card className="relative my-6 mb-0 mr-4 flex w-[25rem] flex-col rounded-xl bg-white shadow-xl">
      <CardHeader className="pb-0">
        <CardTitle>{application.name}</CardTitle>
        <CardDescription>{application.description}</CardDescription>
      </CardHeader>
      <CardContent className="group flex h-full flex-col">
        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
          <Dialog>
            <DialogTrigger asChild>
              <div className="group flex h-full w-full items-center hover:cursor-pointer">
                <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                <InfoSquare className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Preview Application</DialogTitle>
                {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription> */}
              </DialogHeader>
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
              <DialogFooter>

                <Button className="mx-auto">
                  <Link href={`/project/${application.projectId}/apply/${application.id}`}>
                    {`Apply for ${application.name}`}
                  </Link>
                </Button>

              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {application.desiredSkills.length > 0 && (
          <div className="mt-4 flex flex-col">
            <p className="py-px text-sm underline pb-2 font-semibold">Desired Skills</p>
            <div className="flex flex-wrap gap-2">
              {application.desiredSkills.map((skill: string, index: number) => (
                <Badge
                  className="h-[2rem] bg-secondary capitalize text-white shadow-xl hover:cursor-pointer"
                  key={`skillBadge${index}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex grow flex-col justify-end">
          <Separator orientation="horizontal" className="my-4 bg-secondary" />
          {application.deadline && (
            <p>
              Deadline:{" "}
              <span className="text-sm font-semibold">
                {application.deadline.toLocaleDateString(
                  undefined,
                  DATE_TIME_FORMAT_OPTS,
                )}
              </span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationPreviewCard;
