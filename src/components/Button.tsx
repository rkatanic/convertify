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
    className={`disabled:cursor-not-allowed cursor-pointer hover:bg-emerald-900 relative text-xl text-white bg-emerald-800 rounded-b p-5 ${
      fullWidth ? "w-full" : ""
    }`}
    type="button"
    onClick={onClick}
  >
    <div className="absolute flex w-16">
      <FiRefreshCw
        className={`absolute top-1 stroke-emerald-600 ${
          isConverting ? "animate-spin" : ""
        }`}
      />
      {isConverting && (
        <div className="mt-1 ml-8 text-sm text-emerald-50">
          {Math.round(conversionProgress * 100)}%
        </div>
      )}
    </div>
    {isConverting ? "Converting" : text}
  </button>
);

export default Button;
