type PropType = {
  title: string;
  children: JSX.Element;
};

const PageWrapper = (props: PropType) => {
  const { title, children } = props;

  return (
    <div className="my-36 flex h-full w-full flex-col items-center justify-center gap-8 px-4">
      <section>
        <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
          {title}
        </h1>
      </section>

      {children}
    </div>
  );
};

export default PageWrapper;
