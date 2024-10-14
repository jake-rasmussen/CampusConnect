import { ProjectContext } from "lib/context";
import { useContext } from "react";

const DescriptionOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { colors } = useContext(ProjectContext); // Destructure colors from the context

  return (
    <>
      <div className="relative max-w-6xl text-center md:px-6 md:py-0">
        <h1
          className="text-2xl font-semibold"
          style={{ textDecorationColor: colors.secondaryColor }} // Inline style for underline color
        >
          Description
        </h1>
        <div className="m-4">{children}</div>
      </div>
    </>
  );
};

export default DescriptionOutline;