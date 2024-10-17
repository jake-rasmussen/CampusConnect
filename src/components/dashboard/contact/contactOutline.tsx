import { ProjectContext } from "lib/context";
import { useContext } from "react";

const ContactOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { colors } = useContext(ProjectContext); // Access colors from context

  return (
    <>
      <section className="flex max-w-6xl flex-col md:pt-0">
        <h1
          className="text-center text-2xl font-semibold"
          style={{ textDecorationColor: colors.secondaryColor }} // Inline style for underline color
        >
          Contact
        </h1>
        <div className="relative flex w-full flex-wrap items-center justify-center gap-x-4 lg:mx-0">
          {children}
        </div>
      </section>
    </>
  );
};

export default ContactOutline;
