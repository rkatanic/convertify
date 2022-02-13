import { useState } from "react";
import { ReactComponent as FileUploadIcon } from "../icons/file-upload.svg";
import { ReactComponent as FileUploadSuccessIcon } from "../icons/file-upload-success.svg";

import "./OCRFileUpload.scss";

interface Props {
  setImage: (value: string) => void;
}

const OCRFileUpload = ({ setImage }: Props): JSX.Element => {
  const [file, setFile] = useState({ name: "", size: "" });

  const handleFileUpload = (e: any): void => {
    if (e.target.files[0]) {
      const { name, size } = e.target.files[0];
      let shortName = "";
      if (name.length > 16) {
        shortName = `${name.slice(0, 8)}...${name.slice(-8)}`;
        console.log(shortName);
      }
      setFile({
        name: shortName ? shortName : name,
        size: (size / 1000).toFixed(2),
      });
      setImage(URL.createObjectURL(e.target?.files![0]));
    }
  };
  return (
    <div className="ocr-file-upload">
      <input
        className="ocr-file-upload-input"
        type="file"
        title=""
        onChange={handleFileUpload}
      />
      <div className="ocr-file-upload-container">
        {file.name !== "" && file.size !== "" ? (
          <FileUploadSuccessIcon />
        ) : (
          <FileUploadIcon />
        )}
        <div className="ocr-file-upload-container-txt">
          <h3 className="ocr-file-upload-container-txt-title">
            {file.name === "" ? "Upload an image" : file.name}
          </h3>
          <p className="ocr-file-upload-container-txt-desc">
            {file.size === "" ? (
              <span>
                Supported formats are: <br /> jpg, png, bmp, pbm.
              </span>
            ) : (
              file.size + " KB"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OCRFileUpload;
