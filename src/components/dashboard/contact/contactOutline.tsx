const ContactOutline = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <>
      <section className="justify-left flex flex-col md:pt-0">
        <h1 className="text-center text-2xl font-semibold underline lg:text-left">
          Contact
        </h1>
        <div className="relative mx-auto flex flex-col lg:mx-0">{children}</div>
      </section>
    </>
  );
};

export default ContactOutline;
