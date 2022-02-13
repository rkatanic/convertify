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

import "./ImageToTextConveter.scss";

interface State {
  conversionOption: ConversionOption;
  language: Language;
  image: string;
  text: string;
  progress: number;
  isLoading: boolean;
  error: ErrorType;
}

interface Action {
  type: ActionType;
  payload?: any;
}

enum ActionType {
  SET_IMAGE,
  SET_LANGUAGE,
  SET_PROGRESS,
  SET_ERROR,
  CHANGE_CONVERSION_OPTION,
  CONVERT_NEW_IMAGE,
  CONVERT_IMAGE_INIT,
  CONVERT_IMAGE_SUCCESS,
  CONVERT_IMAGE_ERROR,
}

enum ConversionOption {
  FILE_UPLOAD,
  BY_LINK,
}

const initialState = {
  conversionOption: ConversionOption.FILE_UPLOAD,
  language: DEFAULT_LANGUAGE,
  image: "",
  text: "",
  progress: 0,
  isLoading: false,
  error: ErrorType.NO_ERROR,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_IMAGE:
      return { ...state, image: action.payload, error: ErrorType.NO_ERROR };
    case ActionType.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case ActionType.SET_PROGRESS:
      return { ...state, progress: action.payload };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionType.CHANGE_CONVERSION_OPTION:
      return {
        ...state,
        image: "",
        text: "",
        error: ErrorType.NO_ERROR,
        isLoading: false,
        conversionOption: action.payload,
      };
    case ActionType.CONVERT_NEW_IMAGE:
      return {
        ...state,
        image: "",
        text: "",
        error: ErrorType.NO_ERROR,
        isLoading: false,
        progress: 0,
      };
    case ActionType.CONVERT_IMAGE_INIT:
      return {
        ...state,
        isLoading: true,
        progress: 0,
        error: ErrorType.NO_ERROR,
      };
    case ActionType.CONVERT_IMAGE_SUCCESS:
      return {
        ...state,
        text: action.payload,
        isLoading: false,
        error: ErrorType.NO_ERROR,
      };
    case ActionType.CONVERT_IMAGE_ERROR:
      return {
        ...state,
        error: ErrorType.CONVERSION_FAILED,
        isLoading: false,
        image: "",
      };
    default:
      return state;
  }
};

const ImageToTextConverter = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    conversionOption,
    language,
    image,
    text,
    progress,
    isLoading,
    error,
  } = state;

  const convertImageToText = async (): Promise<void> => {
    dispatch({ type: ActionType.CONVERT_IMAGE_INIT });
    let result: RecognizeResult;
    try {
      result = await Tesseract.recognize(image, language.key, {
        logger: (m) => {
          m.status === "recognizing text" &&
            dispatch({ type: ActionType.SET_PROGRESS, payload: m.progress });
        },
      });
      if (result.data.text) {
        dispatch({
          type: ActionType.CONVERT_IMAGE_SUCCESS,
          payload: result.data.text,
        });
      } else {
        dispatch({ type: ActionType.CONVERT_IMAGE_ERROR });
      }
    } catch (err) {
      dispatch({ type: ActionType.CONVERT_IMAGE_ERROR });
    }
  };

  const handleImageSet = (value: string): void => {
    dispatch({ type: ActionType.SET_IMAGE, payload: value });
  };

  const handleLanguageSet = (language: Language): void => {
    dispatch({ type: ActionType.SET_LANGUAGE, payload: language });
  };

  const handleErrorSet = (error: ErrorType): void => {
    dispatch({ type: ActionType.SET_ERROR, payload: error });
  };

  const handleConvertOptionChange = (value: ConversionOption): void => {
    dispatch({ type: ActionType.CHANGE_CONVERSION_OPTION, payload: value });
  };

  const handleImageAndTextReset = (): void => {
    dispatch({ type: ActionType.CONVERT_NEW_IMAGE });
  };

  return (
    <div className="main-content">
      <div className="convert-options">
        <button
          disabled={isLoading}
          className={`convert-option ${
            conversionOption === ConversionOption.FILE_UPLOAD ? "active" : ""
          }`}
          onClick={() =>
            handleConvertOptionChange(ConversionOption.FILE_UPLOAD)
          }
        >
          File Upload
        </button>
        <button
          disabled={isLoading}
          className={`convert-option ${
            conversionOption === ConversionOption.BY_LINK ? "active" : ""
          }`}
          onClick={() => handleConvertOptionChange(ConversionOption.BY_LINK)}
        >
          By Link
        </button>
      </div>
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
      {!isLoading && !text && (
        <Languages
          setLanguage={handleLanguageSet}
          selectedLanguage={language}
        />
      )}
      {!isLoading && !text ? (
        conversionOption === ConversionOption.FILE_UPLOAD ? (
          <OCRFileUpload
            handleError={handleErrorSet}
            setImage={handleImageSet}
          />
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

export default ImageToTextConverter;
