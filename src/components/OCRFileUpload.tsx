import { useState } from "react";
import { ErrorType } from "../types/ErrorType";
import { ReactComponent as FileUploadIcon } from "../icons/file-upload.svg";
import { ReactComponent as FileUploadSuccessIcon } from "../icons/file-upload-success.svg";

import "./OCRFileUpload.scss";

interface Props {
  setImage: (value: string) => void;
  handleError: (error: ErrorType) => void;
}

const SUPPORTED_FILE_FORMATS = [".jpg", "jpeg", ".png", ".bmp", ".pbm"];

const OCRFileUpload = ({ setImage, handleError }: Props): JSX.Element => {
  const [file, setFile] = useState({ name: "", size: "" });

  const handleFileUpload = (e: any): void => {
    if (e.target.files[0]) {
      const { name, size } = e.target.files[0];

      const isUnsupportedFileFormat = !SUPPORTED_FILE_FORMATS.some(
        (fileFormat) => fileFormat === name.slice(-4)
      );

      if (isUnsupportedFileFormat) {
        handleError(ErrorType.UNSUPPORTED_FILE_FORMAT);
        return;
      }

      const isLargerThanFiveMegabytes = size / 1000 > 5120;

      if (isLargerThanFiveMegabytes) {
        handleError(ErrorType.MAX_FILE_SIZE_EXCEEDED);
        return;
      }

      setFile({
        name,
        size: `${(size / 1000).toFixed(2)} KB`,
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
        data-testid="ocr-file-upload-input"
      />
      <div className="ocr-file-upload-container">
        {file.name !== "" && file.size !== "" ? (
          <FileUploadSuccessIcon />
        ) : (
          <FileUploadIcon />
        )}
        <div className="ocr-file-upload-container-txt">
          <h3 className="ocr-file-upload-container-txt-title">
            {file.name === "" ? "Select file to upload" : file.name}
          </h3>
          <p className="ocr-file-upload-container-txt-desc">
            {file.size ? (
              file.size
            ) : (
              <>
                Supported formats are: <br /> jpg, jpeg, png, bmp, pbm. <br />
                Max file upload size is <b>5 MB</b>.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OCRFileUpload;
