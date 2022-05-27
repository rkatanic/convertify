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
import { ActionType } from "../../types/Action";
import { ConversionOption } from "../../types/ConversionOption";
import { ErrorType } from "../../types/ErrorType";

describe("conversionActions", (): void => {
  it("setImage", (): void => {
    const action = setImage("imageUrl");

    expect(action).toEqual({
      type: ActionType.SET_IMAGE,
      payload: "imageUrl",
    });
  });

  it("setLanguage", (): void => {
    const action = setLanguage({ key: "eng", value: "English" });

    expect(action).toEqual({
      type: ActionType.SET_LANGUAGE,
      payload: { key: "eng", value: "English" },
    });
  });

  it("setError", (): void => {
    const action = setError(ErrorType.CONVERSION_FAILED);

    expect(action).toEqual({
      type: ActionType.SET_ERROR,
      payload: ErrorType.CONVERSION_FAILED,
    });
  });

  it("changeConvertOption", (): void => {
    const action = changeConvertOption(ConversionOption.BY_LINK);

    expect(action).toEqual({
      type: ActionType.CHANGE_CONVERSION_OPTION,
      payload: ConversionOption.BY_LINK,
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
});
