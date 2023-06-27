const Button = ({ children }: { children: string }) => {
  return (
    <>
      <button className="rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110">
        <span className="tracking-none font-black uppercase text-white">
          {children}
        </span>
      </button>
    </>
  );
};

export default Button;
