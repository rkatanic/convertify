import { copyText, downloadTextFile } from "../util/OCRConverterUtils";
import IconButton from "./IconButton";
import { RiFileCopyFill, RiFileDownloadFill } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

interface Props {
  text?: string;
}

const TextWrapper = ({ text = ""  }: Props) => (
  <div className="top-0 left-0 w-full">
    <div className="border-l border-neutral-800 ml-8 py-5 flex items-baseline justify-between font-thin text-white">
      <div className="ml-5 relative text-neutral-500 font-medium">
        Output result
        <div className="flex items-center justify-center w-5 h-5 border bg-neutral-900 border-emerald-800 rounded-full absolute -left-[1.925rem] top-[0.125rem]">
          <FiCheck size="0.75rem" className="stroke-emerald-400" />
        </div>
      </div>
    </div>

    <textarea
      disabled
      value={text}
      className="text-white w-full bg-transparent p-5 resize-none border-neutral-800 rounded"
      placeholder="Output text"
      rows={11}
    />
    <div className="flex justify-end gap-5 mt-3">
      <IconButton
        label="Copy text"
        icon={
          <RiFileCopyFill
            data-testid="copy-icon"
            className="fill-white"
            size="1rem"
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
            className="fill-white"
            size="1rem"
          />
        }
        onClick={() => downloadTextFile(text)}
        {...(!text && { disabled: true })}
      />
    </div>
  </div>
);
export default TextWrapper;
