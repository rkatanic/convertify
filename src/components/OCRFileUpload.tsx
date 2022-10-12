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

    if (file) {
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
    }
  };

  return (
    <div className="cursor-pointer flex border-dashed p-6 h-20">
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
        className="cursor-pointer flex justify-between w-full items-center gap-6"
      >
        <div>
          {file.name === "" ? (
            <div className="">
              <span className="text-white text-lg font-medium">
                Upload an image
              </span>{" "}
              <p className="text-neutral-500 text-sm">
                {file.size ? (
                  file.size
                ) : (
                  <>JPG, JPEG, PNG, BMP, PBM up to 5MB</>
                )}
              </p>
            </div>
          ) : (
            file.name
          )}
        </div>
        <RiImageAddLine size="2.5rem" className="fill-neutral-600" />
      </label>
    </div>
  );
};

export default OCRFileUpload;
