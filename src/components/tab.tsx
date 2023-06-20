import { twMerge } from "tailwind-merge";

type PropType = {
  headers: string[];
  tabIndex: number;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Tab = (props: PropType) => {
  const { headers, tabIndex, setTabIndex } = props;

  return (
    <>
      <div className="-mx-4 flex flex-nowrap items-center justify-center space-x-2">
        {headers.map((header: string, index: number) => {
          let buttonClassName =
            "flex items-center flex-shrink-0 px-5 py-4 border-b-4 text-gray-400 border-gray-400 transition duration-300 ease-in-out min-h-8";
          buttonClassName = twMerge(
            buttonClassName,
            index === tabIndex ? "border-primary" : "",
          );

          let textClassName =
            "items-center flex justify-center transition duration-300 ease-in-out px-2 text-lg font-black tracking-none uppercase";
          textClassName = twMerge(
            textClassName,
            index === tabIndex ? "text-primary scale-125" : "",
          );

          return (
            <>
              <button
                className={buttonClassName}
                onClick={() => setTabIndex(index)}
              >
                <span className={textClassName}>{header}</span>
              </button>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Tab;
