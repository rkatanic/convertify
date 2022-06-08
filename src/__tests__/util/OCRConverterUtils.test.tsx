import { copyText, downloadTextFile } from "../../util/OCRConverterUtils";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

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
});
