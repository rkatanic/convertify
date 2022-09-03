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
    <div className="flex gap-4 m-auto">
      <div className="m-auto max-w-lg">
        <div className="h-14 w-14 border-8 bg-indigo-500 rounded-full mb-4"></div>
        <h1 className="font-black text-3xl my-2 text-gray-700">
          Image to text converter
        </h1>
        <p className="text-xl font-medium text-gray-500">
          Extract text from images. Supports 50+ languages.
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-md w-full max-w-md m-auto bg-white shadow-md p-8">
        {error !== ErrorType.NO_ERROR && (
          <Error error={error} onClose={handleErrorBannerClose} />
        )}
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
        <OCRFileUpload
          handleError={handleErrorSet}
          setImage={handleImageFileUpload}
          disabled={isLoading}
        />
        <div className="w-full text-center -mb-2">
          <hr className="w-full -mb-[0.875rem]" />
          <span className=" bg-white px-2 text-xs text-gray-400">
            Or use image url
          </span>
        </div>
        <input
          data-testid="image-url-input"
          type="text"
          placeholder="Enter image URL"
          className="text-sm w-full border border-gray-200 rounded p-2 px-4"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />

        <Button
          {...{ disabled: isLoading || !(imageFile || imageUrl) }}
          text="Convert"
          fullWidth
          onClick={handleImageToTextConversion}
        />
        {isLoading && <ProgressBar progress={progress} />}
        {text && <TextWrapper text={text} />}
      </div>
    </div>
  );
};

export default ImageToTextConverter;
