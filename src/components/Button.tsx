import { FiRefreshCw } from "react-icons/fi";

interface Props {
  text: string | JSX.Element;
  onClick: () => void;
  props?: any;
  fullWidth?: boolean;
  isConverting: boolean;
  conversionProgress: number;
}

const Button = ({
  text,
  onClick,
  fullWidth,
  isConverting,
  conversionProgress,
  ...props
}: Props): JSX.Element => (
  <button
    {...props}
    className={`disabled:cursor-not-allowed cursor-pointer hover:bg-blue-600 relative text-md text-white font-medium bg-blue-500 rounded-full py-2.5 px-4 ${
      fullWidth ? "w-full" : ""
    }`}
    type="button"
    onClick={onClick}
  >
    <div className="absolute flex w-16">
      <FiRefreshCw
        className={`absolute top-1 stroke-blue-300 ${
          isConverting ? "animate-spin " : ""
        }`}
      />
      {isConverting && (
        <div className="mt-0.5 ml-6 text-sm">
          {" "}
          {Math.round(conversionProgress * 100)}%
        </div>
      )}
    </div>
    {isConverting ? "Converting" : text}
  </button>
);

export default Button;
