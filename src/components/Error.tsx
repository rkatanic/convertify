import { ReactComponent as WarningTriangleIcon } from "../icons/warning-triangle.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ErrorType } from "../types/ErrorType";

import "./Error.scss";

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
    <div className="error">
      <div className="error-message">
        <WarningTriangleIcon />
        <span>{showErrorMessage()}</span>
      </div>
      <CloseIcon data-testid="error-icon-close" onClick={onClose} />
    </div>
  );
};
export default Error;
