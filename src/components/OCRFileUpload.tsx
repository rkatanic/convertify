import { useState } from "react";
import { ErrorType } from "../types/ErrorType";
import { RiImageAddLine } from "react-icons/ri";

interface Props {
  setImage: (value: string) => void;
  handleError: (error: ErrorType) => void;
  disabled: boolean;
}

const SUPPORTED_FILE_FORMATS = [".jpg", "jpeg", ".png", ".bmp", ".pbm"];

const OCRFileUpload = ({
  setImage,
  handleError,
  disabled,
}: Props): JSX.Element => {
  const [file, setFile] = useState({ name: "", size: "" });

  const handleFileUpload = (e: any): void => {
    const file = e?.target?.files[0];

    const isUnsupportedFileFormat = !SUPPORTED_FILE_FORMATS.some(
      (fileFormat) => fileFormat === file?.name.slice(-4)
    );

    if (isUnsupportedFileFormat) {
      handleError(ErrorType.UNSUPPORTED_FILE_FORMAT);
      return;
    }

    const isLargerThanFiveMegabytes = file?.size / 1000 > 5120;

    if (isLargerThanFiveMegabytes) {
      handleError(ErrorType.MAX_FILE_SIZE_EXCEEDED);
      return;
    }

    setFile({
      name: file?.name,
      size: `${(file?.size / 1000).toFixed(2)} KB`,
    });
    setImage(URL.createObjectURL(e.target?.files![0]));
  };

  return (
    <div className="cursor-pointer hover:bg-gray-50 border-dashed border-2 rounded-sm p-6">
      <input
        id="file-upload"
        disabled={disabled}
        className="sr-only"
        type="file"
        onChange={handleFileUpload}
        data-testid="ocr-file-upload-input"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center gap-2 text-center"
      >
        <RiImageAddLine size="2.5rem" className="fill-gray-200" />
        <div>
          {file.name === "" ? (
            <div className="mb-1">
              <span className="text-indigo-500 font-medium">Upload a file</span>{" "}
              <span className="text-gray-400 font-thin">or drag and drop</span>
            </div>
          ) : (
            file.name
          )}
          <p className="text-gray-400 text-sm font-thin">
            {file.size ? file.size : <>JPG, JPEG, PNG, BMP, PBM up to 5MB</>}
          </p>
        </div>
      </label>
    </div>
  );
};

export default OCRFileUpload;
