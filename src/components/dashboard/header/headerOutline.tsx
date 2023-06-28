const HeaderOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <header className="relative bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="flex justify-center px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative flex items-center justify-center text-center">
            {children}
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderOutline;