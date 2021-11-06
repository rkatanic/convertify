import { useState } from "react";
import Tesseract, { RecognizeResult } from "tesseract.js";
import ImageWrapper from "./ImageWrapper";
import ProgressBar from "./ProgressBar";
import TextWrapper from "./TextWrapper";

import "./URLInput.scss";

const URLInput = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const convertImageToText = () => {
    setProgress(0);
    console.log(imageUrl);
    loadData();
  };

  const loadData = async () => {
    setIsLoading(true);
    const result: RecognizeResult = await Tesseract.recognize(imageUrl, "eng", {
      logger: (m) => {
        m.status === "recognizing text" && setProgress(m.progress);
      },
    });
    setText(result.data.text);
    setIsLoading(false);
  };

  return (
    <div>
      <h2>Paste your image URL here</h2>
      <div> https://tesseract.projectnaptha.com/img/eng_bw.png</div>
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <button disabled={!imageUrl} type="button" onClick={convertImageToText}>
        convert
      </button>
      <div className="content">
        <ImageWrapper imageUrl={imageUrl} />
        <div>
          {isLoading && <ProgressBar progress={progress} />}
          <TextWrapper text={text} />
        </div>
      </div>
    </div>
  );
};

export default URLInput;
