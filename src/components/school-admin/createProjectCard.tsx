import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider, user } from "@nextui-org/react";
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

  const createProject = api.projectRouter.createProjectAsSchoolAdmin.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully created project!");

      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...")
    }
  });

  const deleteProjectCreationForm = api.projectRouter.deleteProjectCreationForm.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully deleted project!");

      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...")
    }
  });

  const queryClient = api.useContext();

  const handleCreateProject = async () => {
    toast.loading("Creating project...");

    createProject.mutate({
      name: projectCreationForm.name,
      userId: projectCreationForm.userId,
      projectCreationFormId: projectCreationForm.id,
    });
  }

  const handleDeleteProjectCreationForm = async () => {
    toast.loading("Deleting project...");

    deleteProjectCreationForm.mutate({
      id: projectCreationForm.id
    });
  }

  return (
    <div className="relative">
      <Card className="max-w-[400px] overflow-visible transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer group">
        <CardHeader className="relative flex flex-col">
          <h1>{projectCreationForm.name}</h1>
          <p className="text-center text-neutral-400">
            {projectCreationForm.user.firstName} {projectCreationForm.user.lastName}
          </p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row max-w-full max-y-[400px] overflow-y-scroll">
          <span className="p-4">{projectCreationForm.validation}</span>
        </CardBody>

        <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">

          <div className="absolute h-full w-full rounded-xl bg-black opacity-0 duration-300 group-hover:opacity-10" />

          <div className="flex flex-row gap-2 w-full h-full px-10">
            <button className="group flex h-full w-full items-center z-10" onClick={handleDeleteProjectCreationForm}>
              <X className="mx-auto h-14 w-14 text-red-500 opacity-0 duration-300 group-hover:opacity-100 hover:scale-125" />
            </button>

            <button className="group flex h-full w-full items-center z-10" onClick={handleCreateProject}>
              <Check className="mx-auto h-14 w-14 text-green-500 opacity-0 duration-300 group-hover:opacity-100 hover:scale-125" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateProjectCard;
