import { Colors } from "@prisma/client";
import { ProjectContext } from "lib/context";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

type PropType = {
  tabIndex?: number;
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  isActive?: boolean;
  children: string;
};

const TabHeader = (props: PropType) => {
  const { tabIndex, setActiveTabIndex, isActive } = props;

  const project = useContext(ProjectContext);

  let buttonClassName =
    "flex items-center flex-shrink-0 px-5 py-4 border-b-4 transition duration-300 ease-in-out min-h-8";
  buttonClassName = twMerge(buttonClassName, isActive ? "" : "border-gray");

  let textClassName =
    "items-center flex justify-center transition duration-300 ease-in-out px-2 text-md md:text-2xl font-black tracking-none uppercase";
  textClassName = twMerge(textClassName, isActive ? "scale-125" : "");

  return (
    <button
      className={buttonClassName}
      style={{
        borderColor: isActive ? project.colors.primaryColor : "gray",
      }}
      onClick={() => {
        if (setActiveTabIndex != null && tabIndex != null) {
          setActiveTabIndex(tabIndex);
        }
      }}
    >
      <span
        className={textClassName}
        style={{
          color: isActive
            ? project.colors.primaryColor
            : project.colors.secondaryColor,
        }}
      >
        {props.children}
      </span>
    </button>
  );
};

export default TabHeader;
