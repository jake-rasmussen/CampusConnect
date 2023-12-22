import React from "react";

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
          {projectDescription.split("\n").map((text: string, index: number) => (
            <React.Fragment key={`paragraph${index}${projectId}`}>
              {text}
              <br />
            </React.Fragment>
          ))}
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
