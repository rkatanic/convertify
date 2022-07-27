import { ChangeEvent, useState } from "react";
import { convertFromCyrilicToLatin } from "../util/CyrilicToLatinConveterUtils";
import TextWrapper from "./TextWrapper";

import "./CyrilicToLatinConverter.scss";

const CyrilicToLatinConverter = (): JSX.Element => {
  const [text, setText] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };
  return (
    <div className="cyrilic-to-latin-converter">
      <div>
        <label className="cyrilic-to-latin-converter-textarea-label">
          Input
        </label>
        <textarea
          className="cyrilic-to-latin-converter-textarea"
          value={text}
          onChange={handleTextChange}
          rows={10}
          placeholder="Enter cyrilic text here"
        />
      </div>
      <TextWrapper text={convertFromCyrilicToLatin(text)} />
    </div>
  );
};

export default CyrilicToLatinConverter;
