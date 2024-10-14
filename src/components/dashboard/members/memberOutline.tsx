const MemberOutline = ({
  search,
  children,
  displaySearch,
}: {
  search: JSX.Element;
  children: JSX.Element | JSX.Element[];
  displaySearch: boolean;
}) => {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-8 md:pt-0">
        {displaySearch && search}
        <h1 className="text-center text-2xl font-semibold decoration-secondary">
          Members
        </h1>
        {children}
      </section>
    </>
  );
};

export default MemberOutline;
