import {
  convertImageError,
  convertImageInit,
  convertImageSuccess,
  initNewConversion,
  setError,
  setImageFile,
  setImageUrl,
  setLanguage,
  setProgress,
} from "../../actions/conversionActions";
import { ActionType } from "../../types/Action";
import { ErrorType } from "../../types/ErrorType";

describe("conversionActions", (): void => {
  it("setImageFile", (): void => {
    const action = setImageFile("imageFile");

    expect(action).toEqual({
      type: ActionType.SET_IMAGE_FILE,
      payload: "imageFile",
    });
  });

  it("setImageUrl", (): void => {
    const action = setImageUrl("imageUrl");

    expect(action).toEqual({
      type: ActionType.SET_IMAGE_URL,
      payload: "imageUrl",
    });
  });

  it("setLanguage", (): void => {
    const action = setLanguage("eng");

    expect(action).toEqual({
      type: ActionType.SET_LANGUAGE,
      payload: "eng",
    });
  });

  it("setError", (): void => {
    const action = setError(ErrorType.CONVERSION_FAILED);

    expect(action).toEqual({
      type: ActionType.SET_ERROR,
      payload: ErrorType.CONVERSION_FAILED,
    });
  });

  it("setProgress", (): void => {
    const action = setProgress(0.45);

    expect(action).toEqual({
      type: ActionType.SET_PROGRESS,
      payload: 0.45,
    });
  });

  it("convertImageInit", (): void => {
    const action = convertImageInit();

    expect(action).toEqual({
      type: ActionType.CONVERT_IMAGE_INIT,
    });
  });

  it("convertImageSuccess", (): void => {
    const action = convertImageSuccess("converted text");

    expect(action).toEqual({
      type: ActionType.CONVERT_IMAGE_SUCCESS,
      payload: "converted text",
    });
  });

  it("convertImageError", (): void => {
    const action = convertImageError();

    expect(action).toEqual({
      type: ActionType.CONVERT_IMAGE_ERROR,
    });
  });

  it("convertImageError", (): void => {
    const action = initNewConversion();

    expect(action).toEqual({
      type: ActionType.INIT_NEW_CONVERSION,
    });
  });
});
