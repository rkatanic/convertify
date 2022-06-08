import { useReducer } from "react";
import Tesseract, { RecognizeResult } from "tesseract.js";
import ProgressBar from "./ProgressBar";
import OCRFileUpload from "./OCRFileUpload";
import OCRByLink from "./OCRByLink";
import TextWrapper from "./TextWrapper";
import Button from "./Button";
import Languages from "./Languages";
import Error from "./Error";
import { DEFAULT_LANGUAGE } from "../constants/languages";
import { Language } from "../types/Language";
import { ErrorType } from "../types/ErrorType";
import { conversionReducer } from "../reducer/conversionReducer";
import { ConversionOption } from "../types/ConversionOption";
import { ActionType } from "../types/Action";
import {
  changeConvertOption,
  convertImageError,
  convertImageInit,
  convertImageSuccess,
  setError,
  setImage,
  setLanguage,
  setProgress,
} from "../actions/conversionActions";

import "./ImageToTextConveter.scss";
import Navigation from "./Navigation";

const initialState = {
  conversionOption: ConversionOption.FILE_UPLOAD,
  language: DEFAULT_LANGUAGE,
  image: "",
  text: "",
  progress: 0,
  isLoading: false,
  error: ErrorType.NO_ERROR,
};

const ImageToTextConverter = (): JSX.Element => {
  const [
    { conversionOption, language, image, text, progress, isLoading, error },
    dispatch,
  ] = useReducer(conversionReducer, initialState);

  const convertImageToText = async (): Promise<void> => {
    dispatch(convertImageInit());
    let result: RecognizeResult;
    try {
      result = await Tesseract.recognize(image, language.key, {
        logger: (m) => {
          m.status === "recognizing text" && dispatch(setProgress(m.progress));
        },
      });
      if (result.data.text) {
        dispatch(convertImageSuccess(result.data.text));
      } else {
        dispatch(convertImageError());
      }
    } catch (err) {
      dispatch(convertImageError());
    }
  };

  const handleImageSet = (value: string): void => {
    dispatch(setImage(value));
  };

  const handleLanguageSet = (language: Language): void => {
    dispatch(setLanguage(language));
  };

  const handleErrorSet = (error: ErrorType): void => {
    dispatch(setError(error));
  };

  const handleConvertOptionChange = (value: ConversionOption): void => {
    dispatch(changeConvertOption(value));
  };

  return (
    <div className="main-content">
      <Navigation
        isLoading={isLoading}
        conversionOption={conversionOption}
        changeConversionOption={handleConvertOptionChange}
      />
      {error !== ErrorType.NO_ERROR && (
        <Error
          error={error}
          onClose={() =>
            dispatch({
              type: ActionType.SET_ERROR,
              payload: ErrorType.NO_ERROR,
            })
          }
        />
      )}
      {conversionOption === ConversionOption.FILE_UPLOAD ? (
        <OCRFileUpload handleError={handleErrorSet} setImage={handleImageSet} />
      ) : (
        <OCRByLink setImage={handleImageSet} image={image} />
      )}
      <div className="convert-actions">
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
        <Button
          {...{ disabled: !image || isLoading }}
          text="Convert file"
          onClick={convertImageToText}
        />
      </div>
      {isLoading && <ProgressBar progress={progress} />}

      {text && <TextWrapper text={text} />}
    </div>
  );
};

export default ImageToTextConverter;
