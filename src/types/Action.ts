export enum ActionType {
  SET_IMAGE,
  SET_LANGUAGE,
  SET_PROGRESS,
  SET_ERROR,
  CHANGE_CONVERSION_OPTION,
  CONVERT_IMAGE_INIT,
  CONVERT_IMAGE_SUCCESS,
  CONVERT_IMAGE_ERROR,
}

export interface Action {
  type: ActionType;
  payload?: any;
}
