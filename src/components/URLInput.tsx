import { useRef, useState } from "react";
import Tesseract, { RecognizeResult } from "tesseract.js";
import Button from "./Button";
import ImageWrapper from "./ImageWrapper";
import Navigation from "./Navigation";
import ProgressBar from "./ProgressBar";
import TextWrapper from "./TextWrapper";
import { ReactComponent as HourglassIcon } from "../icons/hourglass.svg";
import Particles from "react-tsparticles";
import { particlesConfig } from "../config/particlesConfig";

import "./URLInput.scss";

const URLInput = (): JSX.Element => {
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const textRef = useRef({} as any);

  const convertImageToText = (): void => {
    setProgress(0);
    console.log(imageUrl);
    loadData();
  };

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    let result: RecognizeResult;
    try {
      result = await Tesseract.recognize(imageUrl, "eng", {
        logger: (m) => {
          m.status === "recognizing text" && setProgress(m.progress);
        },
      });
      setText(result.data.text);
      setIsLoading(false);
      scrollToText();
    } catch (err) {
      alert("Failed to process image");
      setIsLoading(false);
    }
  };

  const scrollToText = () => {
    textRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="main-content">
      <Navigation />
      {isLoading && <ProgressBar progress={progress} />}

      <div className="content">
        <div className="content-item">
          <Particles params={particlesConfig} />

          <div className="imgurl-container">
            <input
              type="search"
              placeholder="Enter image URL ..."
              className="imgurl-input"
              value={imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageUrl(e.target.value)
              }
            />

            <Button
              {...(isLoading || (!imageUrl && { disabled: true }))}
              text={
                isLoading ? (
                  <span className="loading-content">
                    <HourglassIcon className="icon icon-loading" />
                    Converting
                  </span>
                ) : (
                  `Convert`
                )
              }
              onClick={convertImageToText}
            />
          </div>
          <ImageWrapper imageUrl={imageUrl} />
        </div>
        <div ref={textRef} className="content-item">
          <TextWrapper text={text} clearText={() => setText("")} />
        </div>
      </div>
    </div>
  );
};

export default URLInput;
