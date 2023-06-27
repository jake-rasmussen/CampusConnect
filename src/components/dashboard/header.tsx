type PropType = {
  name: string;
};

const Header = (props: PropType) => {
  const { name } = props;

  return (
    <>
      <header className="relative bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="flex justify-center px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative flex items-center justify-center text-center">
            <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
              {name}
            </h2>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
