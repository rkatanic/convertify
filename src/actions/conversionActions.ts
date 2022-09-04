import { ActionType } from "../types/Action";
import { ErrorType } from "../types/ErrorType";

export const setImageFile = (value: string) => ({
  type: ActionType.SET_IMAGE_FILE,
  payload: value,
});

export const setImageUrl = (value: string) => ({
  type: ActionType.SET_IMAGE_URL,
  payload: value,
});

export const setLanguage = (language: string) => ({
  type: ActionType.SET_LANGUAGE,
  payload: language,
});

export const setError = (error: ErrorType) => ({
  type: ActionType.SET_ERROR,
  payload: error,
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

export const initNewConversion = () => ({
  type: ActionType.INIT_NEW_CONVERSION,
});
