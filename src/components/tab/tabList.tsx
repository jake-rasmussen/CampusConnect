import React from "react";

type PropType = {
  activeTabIndex?: number;
  setActiveTabIndex?: React.Dispatch<React.SetStateAction<number>>;
  children: JSX.Element[];
};

const TabList = (props: PropType) => {
  const { activeTabIndex, setActiveTabIndex } = props;

  const childrenWithProps = React.Children.map(
    props.children,
    (child, tabIndex: number) => {
      return React.cloneElement(child, {
        tabIndex,
        setActiveTabIndex,
        isActive: tabIndex === activeTabIndex,
      });
    },
  );

  return (
    <>
      <main className=" flex flex-nowrap items-center justify-center space-x-2 overflow-x-scroll pb-10">
        {childrenWithProps}
      </main>
    </>
  );
};

export default TabList;
