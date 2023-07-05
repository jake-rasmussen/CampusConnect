const DescriptionOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <div className="relative max-w-6xl py-6 text-center md:px-6 md:py-0">
        <h1 className="py-6 text-2xl font-semibold underline">Description</h1>
        {children}
      </div>
    </>
  );
};

export default DescriptionOutline;
