import { waitFor } from "@testing-library/react";
import Tesseract from "tesseract.js";
import {
  convertImageError,
  convertImageInit,
  convertImageSuccess,
} from "../../actions/conversionActions";
import {
  convertImageToText,
  copyText,
  downloadTextFile,
} from "../../util/OCRConverterUtils";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

jest.mock("tesseract.js", () => ({
  recognize: jest.fn(),
}));

describe("OCRConverterUtils", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
  });

  it("should copy text to clipboard", (): void => {
    jest.spyOn(navigator.clipboard, "writeText");

    copyText("text");

    expect(navigator?.clipboard?.writeText).toHaveBeenNthCalledWith(1, "text");
  });

  it("should download file", () => {
    const mockElement = {
      click: jest.fn(),
    } as any;
    jest.spyOn(document, "createElement").mockImplementation(() => mockElement);

    downloadTextFile("file content");

    expect(mockElement.download).toEqual("myFile.txt");
    expect(mockElement.click).toHaveBeenCalledTimes(1);
  });

  describe("convertImageToText", (): void => {
    it("should dispatch error when conversion fails", async (): Promise<void> => {
      (Tesseract.recognize as jest.Mock).mockRejectedValue(() => {});

      const mockDispatch = jest.fn();
      const mockImage = "image";
      const mockLanguage = {
        key: "eng",
        value: "English",
      };

      convertImageToText(mockDispatch, mockImage, mockLanguage);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenNthCalledWith(1, convertImageInit());
        expect(mockDispatch).toHaveBeenNthCalledWith(2, convertImageError());
      });
    });

    it("should dispatch error when converted text is empty", async (): Promise<void> => {
      const mockResult = {
        data: {
          text: "",
        },
      } as Tesseract.RecognizeResult;
      (Tesseract.recognize as jest.Mock).mockReturnValue(mockResult);

      const mockDispatch = jest.fn();
      const mockImage = "image";
      const mockLanguage = {
        key: "eng",
        value: "English",
      };

      convertImageToText(mockDispatch, mockImage, mockLanguage);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenNthCalledWith(1, convertImageInit());
        expect(mockDispatch).toHaveBeenNthCalledWith(2, convertImageError());
      });
    });

    it("should convert image to text", async (): Promise<void> => {
      const mockResult = {
        data: {
          text: "converted value",
        },
      } as Tesseract.RecognizeResult;
      (Tesseract.recognize as jest.Mock).mockReturnValue(mockResult);

      const mockDispatch = jest.fn();
      const mockImage = "image";
      const mockLanguage = {
        key: "eng",
        value: "English",
      };

      convertImageToText(mockDispatch, mockImage, mockLanguage);

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenNthCalledWith(1, convertImageInit());
        expect(mockDispatch).toHaveBeenNthCalledWith(
          2,
          convertImageSuccess(mockResult.data.text)
        );
      });
    });
  });
});
