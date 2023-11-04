import { twMerge } from "tailwind-merge";

type PropTypes = {
  onClick?: () => void;
  children: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  disabled,
  onClick,
  children,
  className,
  type,
}: PropTypes) => {
  return (
    <>
      <button
        className={twMerge(
          "max-w-xs rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110",
          className,
        )}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
        }}
        disabled={disabled !== undefined ? disabled : false}
        type={type}
      >
        <span className="tracking-none font-black uppercase text-white">
          {children}
        </span>
      </button>
    </>
  );
};

export default Button;
