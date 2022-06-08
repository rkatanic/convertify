import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import { ReactComponent as DownloadFileIcon } from "../icons/download-file.svg";
import { copyText, downloadTextFile } from "../util/OCRConverterUtils";
import IconButton from "./IconButton";

import "./TextWrapper.scss";

interface Props {
  text?: string;
}

const TextWrapper = ({ text = "" }: Props) => {
  return (
    <div className="text-wrapper">
      <div className="text-wrapper-left">
        <span>output</span>
      </div>
      <div className="text-wrapper-actions">
        <div className="text-wrapper-icons">
          <IconButton
            label="Copy text"
            icon={<CopyIcon />}
            onClick={() => copyText(text)}
            {...(!text && { disabled: true })}
          />
          <IconButton
            label="Download"
            icon={<DownloadFileIcon />}
            onClick={() => downloadTextFile(text)}
            {...(!text && { disabled: true })}
          />
        </div>
      </div>
      <div className="text">{text}</div>
    </div>
  );
};
export default TextWrapper;
