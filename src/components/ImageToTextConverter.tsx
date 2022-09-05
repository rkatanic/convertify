import { useReducer } from "react";
import OCRFileUpload from "./OCRFileUpload";
import TextWrapper from "./TextWrapper";
import Button from "./Button";
import Languages from "./Languages";
import Error from "./Error";
import { convertImageToText } from "../util/OCRConverterUtils";
import { DEFAULT_LANGUAGE } from "../constants/languages";
import { ErrorType } from "../types/ErrorType";
import { conversionReducer } from "../reducer/conversionReducer";
import {
  initNewConversion,
  setError,
  setImageFile,
  setImageUrl,
  setLanguage,
} from "../actions/conversionActions";

const initialState = {
  language: DEFAULT_LANGUAGE.key,
  imageFile: "",
  imageUrl: "",
  text: "",
  progress: 0,
  isConverting: false,
  error: ErrorType.NO_ERROR,
};

const ImageToTextConverter = (): JSX.Element => {
  const [
    { language, imageFile, imageUrl, text, progress, isConverting, error },
    dispatch,
  ] = useReducer(conversionReducer, initialState);

  const handleImageFileUpload = (value: string): void => {
    dispatch(setImageFile(value));
  };

  const handleLanguageSet = (language: string): void => {
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

  const handleNewConversion = (): void => {
    dispatch(initNewConversion());
  };

  return (
    <div className="flex items-center flex-col lg:flex-row px-2 py-4 gap-4 m-auto w-full max-w-4xl before:fixed before:w-2/3 before:h-[66vw] before:bottom-1/4 before:left-1/2 before:border before:rounded-full after:fixed after:w-3/4 after:h-[75vw] after:bottom-[27%] after:left-[40%] after:border after:rounded-full">
      <div className="z-10 flex flex-col items-center text-center lg:text-start lg:items-start m-auto max-w-md">
        <div className="h-14 w-14 border-8 bg-indigo-500 rounded-full mb-4"></div>
        <h1 className="font-bold text-3xl my-2 text-gray-800">
          Image to text converter
        </h1>
        <p className="text-xl font-thin text-gray-500">
          Extract text from images. Supports 50+ languages.
        </p>
      </div>
      <div className="z-10 w-full max-w-md">
        {error !== ErrorType.NO_ERROR && (
          <Error error={error} onClose={handleErrorBannerClose} />
        )}
        <div className="flex flex-col gap-6 w-full m-auto bg-white shadow-md p-8">
          {text ? (
            <TextWrapper text={text} initNewConversion={handleNewConversion} />
          ) : (
            <>
              <Languages
                setLanguage={handleLanguageSet}
                selectedLanguage={language}
              />
              <OCRFileUpload
                handleError={handleErrorSet}
                setImage={handleImageFileUpload}
                disabled={isConverting}
              />
              <div className="w-full text-center -mb-4">
                <hr className="w-full -mb-[0.875rem]" />
                <span className="font-thin bg-white px-2 text-xs text-gray-400">
                  Or use image url
                </span>
              </div>
              <input
                data-testid="image-url-input"
                type="text"
                placeholder="Enter image URL"
                className="focus:border-indigo-500 outline-0 text-md font-thin placeholder:text-gray-500 w-full border-b-2 pb-2.5"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />

              <Button
                {...{ disabled: isConverting || !(imageFile || imageUrl) }}
                text="Convert"
                fullWidth
                onClick={handleImageToTextConversion}
                isConverting={isConverting}
                conversionProgress={progress}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToTextConverter;
