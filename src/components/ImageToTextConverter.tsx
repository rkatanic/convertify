import { useState } from "react";
import Tesseract, { RecognizeResult } from "tesseract.js";
import ProgressBar from "./ProgressBar";
import OCRFileUpload from "./OCRFileUpload";
import OCRByLink from "./OCRByLink";
import TextWrapper from "./TextWrapper";
import Button from "./Button";
import { DEFAULT_LANGUAGE } from "../constants/LANGUAGES";
import Languages from "./Languages";
import { Language } from "../types/Language";
import { ReactComponent as WarningTriangleIcon } from "../icons/warning-triangle.svg";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

import "react-toastify/dist/ReactToastify.css";
import "./ImageToTextConveter.scss";

const URLInput = (): JSX.Element => {
  const [convertOption, setConvertOption] = useState("file-upload");
  const [image, setImage] = useState("");
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const convertImageToText = (): void => {
    setProgress(0);
    loadData();
  };

  const loadData = async (): Promise<void> => {
    setIsLoading(true);
    let result: RecognizeResult;
    try {
      result = await Tesseract.recognize(image, language.key, {
        logger: (m) => {
          m.status === "recognizing text" && setProgress(m.progress);
        },
      });
      setText(result.data.text);
      setIsLoading(false);
      setHasError(false);
    } catch (err) {
      setImage("");
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleImageSet = (value: string): void => {
    setImage(value);
  };

  const handleLanguageSet = (language: Language): void => {
    setLanguage(language);
  };

  const handleConvertOptionChange = (value: string): void => {
    setImage("");
    setText("");
    setHasError(false);
    setConvertOption(value);
  };

  const handleImageAndTextReset = (): void => {
    setImage("");
    setText("");
  };

  return (
    <div className="main-content">
      <div className="convert-options">
        <h3
          className={`convert-option ${
            convertOption === "file-upload" ? "active" : ""
          }`}
          onClick={() => handleConvertOptionChange("file-upload")}
        >
          File Upload
        </h3>
        <h3
          className={`convert-option ${
            convertOption === "by-link" ? "active" : ""
          }`}
          onClick={() => handleConvertOptionChange("by-link")}
        >
          By Link
        </h3>
      </div>
      {hasError && (
        <div className="error">
          <div className="error-message">
            <WarningTriangleIcon />
            <span> Whoops! Image conversion failed. Please try again.</span>
          </div>
          <CloseIcon onClick={() => setHasError(false)} />
        </div>
      )}
      {!isLoading && !text && (
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
      )}
      {!isLoading && !text ? (
        convertOption === "file-upload" ? (
          <OCRFileUpload setImage={handleImageSet} />
        ) : (
          <OCRByLink setImage={handleImageSet} image={image} />
        )
      ) : null}
      {isLoading && <ProgressBar progress={progress} />}
      {text ? (
        <>
          <TextWrapper text={text} />
          <Button text="Convert New Image" onClick={handleImageAndTextReset} />
        </>
      ) : (
        !isLoading && (
          <Button
            {...{ disabled: !image }}
            text="Convert"
            onClick={convertImageToText}
          />
        )
      )}
    </div>
  );
};

export default URLInput;
