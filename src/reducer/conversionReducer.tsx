import { Action, ActionType } from "../types/Action";
import { ErrorType } from "../types/ErrorType";

interface State {
  language: string;
  imageFile: string;
  imageUrl: string;
  text: string;
  progress: number;
  isConverting: boolean;
  error: ErrorType;
}

export const conversionReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_IMAGE_URL:
      return { ...state, imageUrl: action.payload, error: ErrorType.NO_ERROR };
    case ActionType.SET_IMAGE_FILE:
      return { ...state, imageFile: action.payload, error: ErrorType.NO_ERROR };
    case ActionType.SET_LANGUAGE:
      return { ...state, language: action.payload };
    case ActionType.SET_PROGRESS:
      return { ...state, progress: action.payload };
    case ActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionType.CONVERT_IMAGE_INIT:
      return {
        ...state,
        isConverting: true,
        progress: 0,
        error: ErrorType.NO_ERROR,
      };
    case ActionType.CONVERT_IMAGE_SUCCESS:
      return {
        ...state,
        text: action.payload,
        isConverting: false,
        error: ErrorType.NO_ERROR,
      };
    case ActionType.CONVERT_IMAGE_ERROR:
      return {
        ...state,
        error: ErrorType.CONVERSION_FAILED,
        isConverting: false,
      };

    case ActionType.INIT_NEW_CONVERSION:
      return {
        ...state,
        imageFile: "",
        imageUrl: "",
        text: "",
        progress: 0,
        isConverting: false,
        error: ErrorType.NO_ERROR,
      };
    default:
      return state;
  }
};
