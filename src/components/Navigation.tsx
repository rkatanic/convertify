import { ConversionOption } from "../types/ConversionOption";
import { ReactComponent as FileTextIcon } from "../icons/file-text.svg";
import { ReactComponent as LinkIcon } from "../icons/link.svg";

import "./Navigation.scss";

interface Props {
  isLoading: boolean;
  conversionOption: ConversionOption;
  changeConversionOption: (conversionOption: ConversionOption) => void;
}

const Navigation = ({
  isLoading,
  conversionOption,
  changeConversionOption,
}: Props): JSX.Element => {
  return (
    <div className="convert-options">
      <button
        disabled={isLoading}
        className={`convert-option ${
          conversionOption === ConversionOption.FILE_UPLOAD ? "active" : ""
        }`}
        onClick={() => changeConversionOption(ConversionOption.FILE_UPLOAD)}
      >
        File Upload
      </button>
      <button
        disabled={isLoading}
        className={`convert-option ${
          conversionOption === ConversionOption.BY_LINK ? "active" : ""
        }`}
        onClick={() => changeConversionOption(ConversionOption.BY_LINK)}
      >
        By Link
      </button>
    </div>
  );
};

export default Navigation;
