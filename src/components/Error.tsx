import { ErrorType } from "../types/ErrorType";
import { FiX, FiAlertCircle } from "react-icons/fi";

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
      className="mb-6 border-l-[3px] border-red-500 p-4 bg-red-900/25"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-2 font-medium text-red-400 text-lg">
          <FiAlertCircle />
          Error
        </div>
        <FiX
          data-testid="error-icon-close"
          onClick={onClose}
          size="1.5rem"
          className="cursor-pointer stroke-red-50"
        />
      </div>
      <div className="text-red-100">
        <span>{showErrorMessage()}</span>
      </div>
    </div>
  );
};
export default Error;
