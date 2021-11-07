import { ReactComponent as CopyIcon } from "../icons/copy.svg";
import { ReactComponent as ReloadIcon } from "../icons/reload.svg";
import { ReactComponent as DownloadFileIcon } from "../icons/download-file.svg";

import "./TextWrapper.scss";

interface Props {
  text?: string;
  clearText: () => void;
}

const TextWrapper = ({ text = "", clearText }: Props) => {
  const copyText = (): void => {
    navigator.clipboard.writeText(text);
    alert("Text copied successfully!");
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
        <ReloadIcon className="icon icon-reload" onClick={clearText} />
        <CopyIcon className="icon icon-copy" onClick={copyText} />
        <DownloadFileIcon className="icon" onClick={downloadTextToFile} />
      </div>
      <textarea
        readOnly={true}
        value={text}
        placeholder="Your converted text will appear here..."
      />
    </div>
  );
};
export default TextWrapper;
