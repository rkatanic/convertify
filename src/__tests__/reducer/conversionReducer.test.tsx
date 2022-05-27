import {
  changeConvertOption,
  convertImageError,
  convertImageInit,
  convertImageSuccess,
  setError,
  setImage,
  setLanguage,
  setProgress,
} from "../../actions/conversionActions";
import { LANGUAGES } from "../../constants/languages";
import { conversionReducer } from "../../reducer/conversionReducer";
import { Action, ActionType } from "../../types/Action";
import { ConversionOption } from "../../types/ConversionOption";
import { ErrorType } from "../../types/ErrorType";

describe("ConversionReducer", (): void => {
  it("should return initial state", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, {} as Action);
    expect(nextState).toEqual(initialState);
  });

  it("should set image", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, setImage("imageUrl"));
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "imageUrl",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should set language", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(
      initialState,
      setLanguage({ key: "eng", value: "English" })
    );
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: { key: "eng", value: "English" },
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should set error", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(
      initialState,
      setError(ErrorType.CONVERSION_FAILED)
    );
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.CONVERSION_FAILED,
    });
  });

  it("should set progress", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, setProgress(0.24));
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0.24,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should change conversion option", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(
      initialState,
      changeConvertOption(ConversionOption.BY_LINK)
    );
    expect(nextState).toEqual({
      conversionOption: ConversionOption.BY_LINK,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should initialize image conversion", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, convertImageInit());
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: true,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should succeed image conversion", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(
      initialState,
      convertImageSuccess("converted text")
    );
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "converted text",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should fail image conversion", (): void => {
    const initialState = {
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, convertImageError());
    expect(nextState).toEqual({
      conversionOption: ConversionOption.FILE_UPLOAD,
      language: LANGUAGES[0],
      image: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.CONVERSION_FAILED,
    });
  });
});
