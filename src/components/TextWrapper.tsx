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
      <div className="text-wrapper-heading">Output</div>
      <textarea
        disabled
        value={text}
        className="text-wrapper-output"
        placeholder="Output text will appear here"
        rows={10}
      />
      <div className="text-wrapper-actions">
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
  );
};
export default TextWrapper;
