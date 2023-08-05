const MemberOutline = ({
  search,
  children,
}: {
  search: JSX.Element;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <section className="flex w-full flex-col items-center gap-10 md:pt-0">
        {search}
        <h1 className="text-center text-2xl font-semibold underline decoration-secondary">
          Members
        </h1>
        {children}
      </section>
    </>
  );
};

export default MemberOutline;
