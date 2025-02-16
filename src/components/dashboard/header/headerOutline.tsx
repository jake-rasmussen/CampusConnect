import { Colors } from "@prisma/client";

const HeaderOutline = ({
  colors,
  children,
}: {
  colors?: Colors;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <header
      className={`relative w-full shadow-2xl ${
        colors ? "" : "bg-gradient-to-r from-secondary to-primary"
      }`}
      style={
        colors
          ? {
              backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
            }
          : undefined
      }
    >
      <div className="flex justify-center px-4 py-28 md:px-24 lg:px-8">
        <div className="flex w-full items-center justify-center text-center">
          {children}
        </div>
      </div>
    </header>
  );
};

export default HeaderOutline;
