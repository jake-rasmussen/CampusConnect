const EventsOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <section>
        <h1 className="w-full text-center text-4xl font-black uppercase">
          Events
        </h1>
        <div className="relative mx-14 flex flex-col items-center justify-center lg:mx-20">
          {children}
        </div>
      </section>
    </>
  );
};

export default EventsOutline;
