import { copyText, downloadTextFile } from "../util/OCRConverterUtils";
import IconButton from "./IconButton";
import { RiFileCopyFill, RiFileDownloadFill } from "react-icons/ri";

interface Props {
  text?: string;
  initNewConversion: () => void;
}

const TextWrapper = ({ text = "", initNewConversion }: Props) => (
  <div className="top-0 left-0 bg-white w-full">
    <div className="flex items-end justify-between mb-4 text-lg font-thin text-gray-500">
      Output
      <button
        onClick={initNewConversion}
        type="button"
        className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded"
      >
        New conversion
      </button>
    </div>

    <textarea
      disabled
      value={text}
      className="w-full border-b-2 bg-gray-50 p-2 resize-none"
      placeholder="Output text"
      rows={11}
    />
    <div className="mt-1 flex justify-end gap-4">
      <IconButton
        label="Copy text"
        icon={
          <RiFileCopyFill
            data-testid="copy-icon"
            className="fill-gray-400 hover:fill-indigo-500"
            size="1.25rem"
          />
        }
        onClick={() => copyText(text)}
        {...(!text && { disabled: true })}
      />
      <IconButton
        label="Download"
        icon={
          <RiFileDownloadFill
            data-testid="download-icon"
            className="fill-gray-400 hover:fill-indigo-500"
            size="1.25rem"
          />
        }
        onClick={() => downloadTextFile(text)}
        {...(!text && { disabled: true })}
      />
    </div>
  </div>
);
export default TextWrapper;
