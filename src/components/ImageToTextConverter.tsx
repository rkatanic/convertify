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
    <div className="flex items-center flex-col py-4 px-2 gap-4 m-auto w-full max-w-lg">
      <h1 className="font-medium text-3xl py-6 my-4 text-white w-full border-b border-neutral-800">
        Image to text converter
      </h1>
      <div className="z-10 w-full">
        {error !== ErrorType.NO_ERROR && (
          <Error error={error} onClose={handleErrorBannerClose} />
        )}
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
        <div className="rounded-md w-full my-6 border border-neutral-800">
          {text ? (
            <TextWrapper text={text} initNewConversion={handleNewConversion} />
          ) : (
            <>
              <input
                data-testid="image-url-input"
                type="text"
                placeholder="Enter image URL"
                className="h-20 p-6 text-white outline-0 text-lg placeholder:text-neutral-500 w-full bg-transparent"
                value={imageUrl}
                onChange={handleImageUrlChange}
              />
              <div className="w-full text-center h-0">
                <hr className="w-full -mb-[0.75rem] border-neutral-800" />
                <span className="bg-neutral-900 px-2 text-md text-neutral-500">
                  or
                </span>
              </div>
              <OCRFileUpload
                handleError={handleErrorSet}
                setImage={handleImageFileUpload}
                disabled={isConverting}
              />

              <Button
                {...{ disabled: isConverting || !(imageFile || imageUrl) }}
                text="Extract text"
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
