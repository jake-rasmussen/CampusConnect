const ApplicationsOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-wrap justify-center max-w-4xl">{children}</div>
      </div>
    </>
  );
};

export default ApplicationsOutline;
