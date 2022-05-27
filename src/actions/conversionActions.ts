import { ActionType } from "../types/Action";
import { ConversionOption } from "../types/ConversionOption";
import { ErrorType } from "../types/ErrorType";
import { Language } from "../types/Language";

export const setImage = (value: string) => ({
  type: ActionType.SET_IMAGE,
  payload: value,
});

export const setLanguage = (language: Language) => ({
  type: ActionType.SET_LANGUAGE,
  payload: language,
});

export const setError = (error: ErrorType) => ({
  type: ActionType.SET_ERROR,
  payload: error,
});

export const changeConvertOption = (value: ConversionOption) => ({
  type: ActionType.CHANGE_CONVERSION_OPTION,
  payload: value,
});

export const setProgress = (value: number) => ({
  type: ActionType.SET_PROGRESS,
  payload: value,
});

export const convertImageInit = () => ({
  type: ActionType.CONVERT_IMAGE_INIT,
});

export const convertImageSuccess = (value: string) => ({
  type: ActionType.CONVERT_IMAGE_SUCCESS,
  payload: value,
});

export const convertImageError = () => ({
  type: ActionType.CONVERT_IMAGE_ERROR,
});
