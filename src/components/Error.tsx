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
        return "Image conversion failed. Please try again.";
      case ErrorType.UNSUPPORTED_FILE_FORMAT:
        return "Unsupported file format.";
      case ErrorType.MAX_FILE_SIZE_EXCEEDED:
        return "Maximum file size exceeded. Please use file up to 5 MB.";
      default:
        return "Image conversion failed. Please try again.";
    }
  };

  return (
    <div
      data-testid="error-banner"
      className="mb-6 border-l-[3px] border-red-500 p-4 bg-red-900/20"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-medium text-red-400">Error</div>
        <FiX
          data-testid="error-icon-close"
          onClick={onClose}
          size="1.25rem"
          className="cursor-pointer stroke-white"
        />
      </div>
      <div className="text-white">
        <span>{showErrorMessage()}</span>
      </div>
    </div>
  );
};
export default Error;
