import { twMerge } from "tailwind-merge";

const Button = ({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children: string;
  className?: string;
}) => {
  return (
    <>
      <button
        className={twMerge(
          "max-w-xs rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110",
          className
        )}
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
