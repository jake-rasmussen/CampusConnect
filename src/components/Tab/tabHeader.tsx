import { twMerge } from "tailwind-merge";

type PropType = {
  tabIndex?: number;
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  isActive?: boolean;
  children: string;
};

const TabHeader = (props: PropType) => {
  const { tabIndex, setActiveTabIndex, isActive } = props;

  let buttonClassName =
    "flex items-center flex-shrink-0 px-5 py-4 border-b-4 text-gray border-gray transition duration-300 ease-in-out min-h-8";
  buttonClassName = twMerge(buttonClassName, isActive ? "border-primary" : "");

  let textClassName =
    "items-center flex justify-center transition duration-300 ease-in-out px-2 text-2xl font-black tracking-none uppercase";
  textClassName = twMerge(
    textClassName,
    isActive ? "text-primary scale-125" : "",
  );

  return (
    <>
      <button
        className={buttonClassName}
        onClick={() => {
          if (setActiveTabIndex != null && tabIndex != null) {
            setActiveTabIndex(tabIndex);
          }
        }}
      >
        <span className={textClassName}>{props.children}</span>
      </button>
    </>
  );
};

export default TabHeader;
