import { ChangeEvent, useState } from "react";
import { convertCyrilicToLatin } from "../util/CyrilicToLatinConveterUtils";
import TextWrapper from "./TextWrapper";
import Breadcrumbs from "./Breadcrumbs";

import "./CyrilicToLatinConverter.scss";

const CyrilicToLatinConverter = (): JSX.Element => {
  const [text, setText] = useState("");

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };
  return (
    <div className="cyrilic-to-latin-converter">
      <Breadcrumbs />
      <div>
        <label
          htmlFor="cyrilic-to-latin-converter-textarea"
          className="cyrilic-to-latin-converter-textarea-label"
        >
          Input
        </label>
        <textarea
          id="cyrilic-to-latin-converter-textarea"
          className="cyrilic-to-latin-converter-textarea"
          value={text}
          onChange={handleTextChange}
          rows={10}
          placeholder="Enter cyrilic text here"
        />
      </div>
      <TextWrapper text={convertCyrilicToLatin(text)} />
    </div>
  );
};

export default CyrilicToLatinConverter;
