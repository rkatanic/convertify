import { useState } from "react";
import Tesseract, { RecognizeResult } from "tesseract.js";
import Button from "./Button";
import ImageWrapper from "./ImageWrapper";
import Navigation from "./Navigation";
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
    <div className="main-content">
      <Navigation />
      <div>https://tesseract.projectnaptha.com/img/eng_bw.png</div>

      <div className="content">
        <div className="content-item">
          <div className="imgurl-container">
            <input
              placeholder="Enter image URL ..."
              className="imgurl-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button text="convert" onClick={convertImageToText} />
          </div>
          <ImageWrapper imageUrl={imageUrl} />
        </div>
        <div className="content-item">
          {isLoading && <ProgressBar progress={progress} />}
          <TextWrapper text={text} />
        </div>
      </div>
    </div>
  );
};

export default URLInput;
