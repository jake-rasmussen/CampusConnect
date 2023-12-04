import { twMerge } from "tailwind-merge";

type PropTypes = {
  onClickFn?: () => void;
  children: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  disabled,
  onClickFn,
  children,
  className,
  type,
}: PropTypes) => {
  return (
    <>
      <button
        className={twMerge(
          "max-w-xs rounded-xl bg-secondary px-4 py-4 transition duration-300 ease-in-out hover:scale-110 disabled:opacity-50",
          className,
        )}
        onClick={(e) => {
          e.preventDefault();
          console.log(onClickFn);
          if (onClickFn) onClickFn();
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
