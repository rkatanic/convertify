import Tesseract, { RecognizeResult } from "tesseract.js";
import {
  convertImageError,
  convertImageInit,
  convertImageSuccess,
  setProgress,
} from "../actions/conversionActions";
import { Action } from "../types/Action";
import { Language } from "../types/Language";

export const downloadTextFile = (text: string) => {
  const element = document.createElement("a");
  const file = new Blob([text], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = "myFile.txt";
  element.click();
};

export const copyText = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const convertImageToText = async (
  dispatch: React.Dispatch<Action>,
  image: string,
  language: string
): Promise<void> => {
  dispatch(convertImageInit());
  let result: RecognizeResult;
  try {
    result = await Tesseract.recognize(image, language, {
      logger: (m) => {
        m.status === "recognizing text" && dispatch(setProgress(m.progress));
      },
    });
    if (result.data.text) {
      dispatch(convertImageSuccess(result.data.text));
    } else {
      dispatch(convertImageError());
    }
  } catch (err) {
    dispatch(convertImageError());
  }
};
