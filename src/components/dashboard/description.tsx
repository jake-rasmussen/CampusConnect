import DescriptionEditor from "./descriptionEditor";

type PropType = {
  clubId: string;
  clubDescription: string;
  edit: boolean;
};

const Description = (props: PropType) => {
  const { clubId, clubDescription, edit } = props;

  return (
    <>
      <div className="relative max-w-6xl py-6 text-center md:px-6 md:py-0">
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
      </div>
    </>
  );
};

export default Description;
