import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tesseract from "tesseract.js";
import ImageToTextConverter from "../../components/ImageToTextConverter";
import { convertImageToText } from "../../util/OCRConverterUtils";

jest.mock("tesseract.js", () => ({
  recognize: jest.fn(),
}));

jest.mock("../../util/OCRConverterUtils", () => ({
  convertImageToText: jest.fn(),
}));

describe("ImageToTextConverter", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<ImageToTextConverter />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should change image url", (): void => {
    const { getByTestId, getByDisplayValue } = render(<ImageToTextConverter />);

    fireEvent.change(getByTestId("image-url-input"), {
      target: { value: "some-image-url" },
    });

    expect(getByDisplayValue("some-image-url")).toBeInTheDocument();
  });

  it("should upload file", async (): Promise<void> => {
    global.URL.createObjectURL = jest.fn();
    const { getByTestId, getByText } = render(<ImageToTextConverter />);

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

    await waitFor((): void => {
      userEvent.upload(fileInput, mockFile);
      expect(getByText("hello.png")).toBeInTheDocument();
    });
  });

  it("should change language", (): void => {
    const { getByText } = render(<ImageToTextConverter />);

    fireEvent.click(getByText("English"));
    fireEvent.click(getByText("Serbian"));

    expect(getByText("Serbian")).toBeInTheDocument();
  });

  it("should convert image to text", async (): Promise<void> => {
    const mockResult = {
      data: {
        text: "converted value",
      },
    } as Tesseract.RecognizeResult;
    (Tesseract.recognize as jest.Mock).mockResolvedValue(mockResult);
    global.URL.createObjectURL = jest.fn();
    const { getByTestId, getByText, queryByTestId } = render(
      <ImageToTextConverter />
    );

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

    await waitFor((): void => {
      userEvent.upload(fileInput, mockFile);
      expect(getByText("hello.png")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Convert"));

    await waitFor((): void => {
      expect(convertImageToText).toHaveBeenCalled();
      expect(queryByTestId("error-banner")).not.toBeInTheDocument();
    });
  });

  it("should close error banner", async (): Promise<void> => {
    const { getByText, getByTestId, queryByTestId } = render(
      <ImageToTextConverter />
    );

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.txt", { type: "text" });

    await waitFor(() => {
      userEvent.upload(fileInput, mockFile);
    });

    fireEvent.click(getByText("Convert"));

    await waitFor((): void => {
      expect(getByTestId("error-banner")).toBeInTheDocument();
    });

    fireEvent.click(getByText("close.svg"));

    await waitFor((): void => {
      expect(queryByTestId("error-banner")).not.toBeInTheDocument();
    });
  });
});
