import DescriptionEditor from "./descriptionEditor";
import DescriptionOutline from "./descriptionOutline";

type PropType = {
  projectId: string;
  projectDescription: string;
  editable: boolean;
};

const DescriptionSection = (props: PropType) => {
  const { projectId, projectDescription, editable } = props;

  return (
    <>
      <DescriptionOutline>
        <p className="flex flex-col justify-center px-8 text-center">
          {projectDescription}
        </p>
        {editable ? (
          <DescriptionEditor
            projectDescription={projectDescription}
            projectId={projectId}
          />
        ) : (
          <></>
        )}
      </DescriptionOutline>
    </>
  );
};

export default DescriptionSection;
