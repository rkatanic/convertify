import { ErrorType } from "../types/ErrorType";
import { FiX } from "react-icons/fi";

interface Props {
  onClose: () => void;
  error: ErrorType;
}

const Error = ({ onClose, error }: Props): JSX.Element => {
  const showErrorMessage = (): string => {
    switch (error) {
      case ErrorType.CONVERSION_FAILED:
        return "Whoops! Image conversion failed. Please try again.";
      case ErrorType.UNSUPPORTED_FILE_FORMAT:
        return "Unsupported file format.";
      case ErrorType.MAX_FILE_SIZE_EXCEEDED:
        return "Maximum file size exceeded! Please use file up to 5 MB.";
      default:
        return "";
    }
  };

  return (
    <div
      data-testid="error-banner"
      className="mb-4 shadow-md bg-red-50 border-l-[3px] border-red-500 p-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-medium text-red-700">Error</div>
        <FiX
          data-testid="error-icon-close"
          onClick={onClose}
          size="1.25rem"
          className="stroke-red-800 cursor-pointer"
        />
      </div>
      <div className="text-red-700 font-thin text-sm">
        <span>{showErrorMessage()}</span>
      </div>
    </div>
  );
};
export default Error;
