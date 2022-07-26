import { useReducer } from "react";
import ProgressBar from "./ProgressBar";
import OCRFileUpload from "./OCRFileUpload";
import TextWrapper from "./TextWrapper";
import Button from "./Button";
import Languages from "./Languages";
import Error from "./Error";
import { convertImageToText } from "../util/OCRConverterUtils";
import { DEFAULT_LANGUAGE } from "../constants/languages";
import { Language } from "../types/Language";
import { ErrorType } from "../types/ErrorType";
import { conversionReducer } from "../reducer/conversionReducer";
import {
  setError,
  setImageFile,
  setImageUrl,
  setLanguage,
} from "../actions/conversionActions";

import "./ImageToTextConveter.scss";

const initialState = {
  language: DEFAULT_LANGUAGE,
  imageFile: "",
  imageUrl: "",
  text: "",
  progress: 0,
  isLoading: false,
  error: ErrorType.NO_ERROR,
};

const ImageToTextConverter = (): JSX.Element => {
  const [
    { language, imageFile, imageUrl, text, progress, isLoading, error },
    dispatch,
  ] = useReducer(conversionReducer, initialState);

  const handleImageFileUpload = (value: string): void => {
    dispatch(setImageFile(value));
  };

  const handleLanguageSet = (language: Language): void => {
    dispatch(setLanguage(language));
  };

  const handleErrorSet = (error: ErrorType): void => {
    dispatch(setError(error));
  };

  const handleErrorBannerClose = (): void => {
    dispatch(setError(ErrorType.NO_ERROR));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setImageUrl(e.target.value));
  };

  const handleImageToTextConversion = (): void => {
    convertImageToText(dispatch, imageUrl || imageFile, language);
  };

  return (
    <div className="main-content">
      {error !== ErrorType.NO_ERROR && (
        <Error error={error} onClose={handleErrorBannerClose} />
      )}

      <OCRFileUpload
        handleError={handleErrorSet}
        setImage={handleImageFileUpload}
        disabled={isLoading}
      />
      <div className="separator">OR </div>
      <div className="input-and-languages">
        <input
          data-testid="image-url-input"
          type="text"
          placeholder="Enter image URL"
          className="image-url-input"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
      </div>
      <Button
        {...{ disabled: isLoading }}
        text="Convert"
        fullWidth
        onClick={handleImageToTextConversion}
      />
      {isLoading && <ProgressBar progress={progress} />}
      {text && <TextWrapper text={text} />}
    </div>
  );
};

export default ImageToTextConverter;
