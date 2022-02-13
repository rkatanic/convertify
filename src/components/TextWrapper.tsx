import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import { ReactComponent as DownloadFileIcon } from "../icons/download-file.svg";
import IconButton from "./IconButton";

import "./TextWrapper.scss";

interface Props {
  text?: string;
}

const TextWrapper = ({ text = "" }: Props) => {
  const copyText = (): void => {
    navigator.clipboard.writeText(text);
  };

  const downloadTextToFile = (): void => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="text-wrapper">
      <div className="text-wrapper-icons">
        <IconButton
          icon={<CopyIcon />}
          onClick={copyText}
          {...(!text && { disabled: true })}
        />
        <IconButton
          icon={<DownloadFileIcon />}
          onClick={downloadTextToFile}
          {...(!text && { disabled: true })}
        />
      </div>
      <textarea
        readOnly={true}
        value={text}
        rows={24}
        placeholder="Your converted text will appear here..."
      />
    </div>
  );
};
export default TextWrapper;
