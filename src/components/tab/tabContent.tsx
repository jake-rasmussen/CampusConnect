type PropType = {
  isActive?: boolean;
  children: JSX.Element;
};

const TabContent = (props: PropType) => {
  const { isActive } = props;

  return (
    <>
      <main className="flex w-full justify-center">
        {isActive && props.children}
      </main>
    </>
  );
};

export default TabContent;
