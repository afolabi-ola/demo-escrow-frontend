import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  color?: string;
  textSize?: string;
  padding?: string;
  style?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
}

const Button = ({
  children,
  color = "bg-secondary text-white",
  textSize = "text-md",
  padding = "p-2",
  style = "",
  onClick,
  type = "button",
  isLoading = false,
  href,
}: ButtonProps) => {
  const baseStyle = `${padding} ${textSize} rounded-md transition duration-300 ${style}`;
  const isDisabledStyle = `blur[3px] ${color} text-white cursor-not-allowed ${padding} ${textSize} rounded-md transition duration-300 ${style}`;
  const activeStyle = `${color} cursor-pointer hover:opacity-80`;

  const content = (
    <>
      {children}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={isLoading}
        className={`${baseStyle} ${isLoading ? isDisabledStyle : activeStyle}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseStyle} ${isLoading ? isDisabledStyle : activeStyle}`}
    >
      {content}
    </button>
  );
};

export default Button;
