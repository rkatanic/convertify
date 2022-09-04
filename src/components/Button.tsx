import { FiRefreshCw } from "react-icons/fi";

interface Props {
  text: string | JSX.Element;
  onClick: () => void;
  props?: any;
  fullWidth?: boolean;
}

const Button = ({ text, onClick, fullWidth, ...props }: Props): JSX.Element => {
  return (
    <button
      {...props}
      className={`disabled:cursor-not-allowed cursor-pointer hover:bg-indigo-600 relative text-md text-white font-medium bg-indigo-500 rounded py-2.5 px-4 ${
        fullWidth ? "w-full" : ""
      }`}
      type="button"
      onClick={onClick}
    >
      <FiRefreshCw className="absolute top-3.5 stroke-indigo-300" />
      {text}
    </button>
  );
};

export default Button;
