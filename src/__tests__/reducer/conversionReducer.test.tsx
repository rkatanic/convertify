import {
  convertImageError,
  convertImageInit,
  convertImageSuccess,
  setError,
  setImageFile,
  setImageUrl,
  setLanguage,
  setProgress,
} from "../../actions/conversionActions";
import { LANGUAGES } from "../../constants/languages";
import { conversionReducer } from "../../reducer/conversionReducer";
import { Action } from "../../types/Action";
import { ErrorType } from "../../types/ErrorType";

describe("ConversionReducer", (): void => {
  it("should return initial state", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, {} as Action);

    expect(nextState).toEqual(initialState);
  });

  it("should set image file", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(
      initialState,
      setImageFile("image file")
    );
    expect(nextState).toEqual({
      language: LANGUAGES[0],
      imageFile: "image file",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should set image url", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, setImageUrl("image-url"));
    expect(nextState).toEqual({
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "image-url",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should set language", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
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
      language: { key: "eng", value: "English" },
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should set error", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
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
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.CONVERSION_FAILED,
    });
  });

  it("should set progress", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, setProgress(0.24));
    expect(nextState).toEqual({
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0.24,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should initialize image conversion", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, convertImageInit());
    expect(nextState).toEqual({
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: true,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should succeed image conversion", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
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
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "converted text",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    });
  });

  it("should fail image conversion", (): void => {
    const initialState = {
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.NO_ERROR,
    };

    const nextState = conversionReducer(initialState, convertImageError());
    expect(nextState).toEqual({
      language: LANGUAGES[0],
      imageFile: "",
      imageUrl: "",
      text: "",
      progress: 0,
      isLoading: false,
      error: ErrorType.CONVERSION_FAILED,
    });
  });
});
