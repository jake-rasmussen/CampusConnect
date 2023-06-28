const Button = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: string;
}) => {
  return (
    <>
      <button
        className="max-w-xs rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110"
        onClick={onClick}
      >
        <span className="tracking-none font-black uppercase text-white">
          {children}
        </span>
      </button>
    </>
  );
};

export default Button;
