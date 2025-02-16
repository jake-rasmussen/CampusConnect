import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider, user } from "@heroui/react";
import { ProjectCreationForm, School, User } from "@prisma/client";
import toast from "react-hot-toast";
import { Check, Edit, User as UserIcon, X } from "tabler-icons-react";

import { api } from "~/utils/api";

type PropType = {
  projectCreationForm: ProjectCreationForm & {
    user: User;
  };
};

const CreateProjectCard = (props: PropType) => {
  const { projectCreationForm } = props;

  const createProject =
    api.projectRouter.createProjectAsSchoolAdmin.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully created project!");

        queryClient.invalidate();
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const deleteProjectCreationForm =
    api.projectRouter.deleteProjectCreationForm.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully deleted project!");

        queryClient.invalidate();
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const queryClient = api.useContext();

  const handleCreateProject = async () => {
    toast.loading("Creating project...");

    createProject.mutate({
      name: projectCreationForm.name,
      userId: projectCreationForm.userId,
      projectCreationFormId: projectCreationForm.id,
    });
  };

  const handleDeleteProjectCreationForm = async () => {
    toast.loading("Deleting project...");

    deleteProjectCreationForm.mutate({
      id: projectCreationForm.id,
    });
  };

  return (
    <div className="relative">
      <Card className="group w-[400px] overflow-visible transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
        <CardHeader className="relative flex flex-col">
          <h1>{projectCreationForm.name}</h1>
          <p className="text-center text-neutral-400">
            {projectCreationForm.user.firstName}{" "}
            {projectCreationForm.user.lastName}
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="max-y-[400px] flex max-w-full flex-row overflow-y-scroll">
          <span className="p-4">{projectCreationForm.validation}</span>
        </CardBody>

        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
          <div className="absolute h-full w-full rounded-xl bg-black opacity-0 duration-300 group-hover:opacity-10" />

          <div className="flex h-full w-full flex-row gap-2 px-10">
            <button
              className="group z-10 flex h-full w-full items-center"
              onClick={handleDeleteProjectCreationForm}
            >
              <X className="mx-auto h-14 w-14 text-red-500 opacity-0 duration-300 hover:scale-125 group-hover:opacity-100" />
            </button>

            <button
              className="group z-10 flex h-full w-full items-center"
              onClick={handleCreateProject}
            >
              <Check className="mx-auto h-14 w-14 text-green-500 opacity-0 duration-300 hover:scale-125 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProjectCard;
