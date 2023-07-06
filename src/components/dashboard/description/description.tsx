import DescriptionEditor from "./descriptionEditor";
import DescriptionOutline from "./descriptionOutline";

type PropType = {
  clubId: string;
  clubDescription: string;
  editable: boolean;
};

const Description = (props: PropType) => {
  const { clubId, clubDescription, editable: edit } = props;

  return (
    <>
      <DescriptionOutline>
        <p className="flex flex-col justify-center space-y-2 p-4 px-8 text-center">
          {clubDescription}
        </p>
        {edit ? (
          <DescriptionEditor
            clubDescription={clubDescription}
            clubId={clubId}
          />
        ) : (
          <></>
        )}
      </DescriptionOutline>
    </>
  );
};

export default Description;
