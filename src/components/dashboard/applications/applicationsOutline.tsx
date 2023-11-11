const ApplicationsOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="flex max-w-4xl flex-wrap justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default ApplicationsOutline;
