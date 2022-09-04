export enum ActionType {
  SET_IMAGE_FILE,
  SET_IMAGE_URL,
  SET_LANGUAGE,
  SET_PROGRESS,
  SET_ERROR,
  CONVERT_IMAGE_INIT,
  CONVERT_IMAGE_SUCCESS,
  CONVERT_IMAGE_ERROR,
  INIT_NEW_CONVERSION,
}

export interface Action {
  type: ActionType;
  payload?: any;
}
