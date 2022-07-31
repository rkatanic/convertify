import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tesseract from "tesseract.js";
import ImageToTextConverter from "../../components/ImageToTextConverter";
import { convertImageToText } from "../../util/OCRConverterUtils";
import { MemoryRouter, useLocation } from "react-router-dom";

jest.mock("tesseract.js", () => ({
  recognize: jest.fn(),
}));

jest.mock("../../util/OCRConverterUtils", () => ({
  convertImageToText: jest.fn(),
}));

jest.mock("react-router-dom", (): any => {
  const actualImplementation = jest.requireActual("react-router-dom");
  return {
    ...actualImplementation,
    useLocation: jest.fn(),
  };
});

describe("ImageToTextConverter", (): void => {
  beforeEach((): void => {
    (useLocation as jest.Mock).mockImplementation(() => {
      return { pathname: "/test-route" };
    });
  });
  const TestComponent = (
    <MemoryRouter>
      <ImageToTextConverter />
    </MemoryRouter>
  );

  it("should render", (): void => {
    const { baseElement } = render(TestComponent);

    expect(baseElement).toMatchSnapshot();
  });

  it("should change image url", (): void => {
    const { getByTestId, getByDisplayValue } = render(TestComponent);

    fireEvent.change(getByTestId("image-url-input"), {
      target: { value: "some-image-url" },
    });

    expect(getByDisplayValue("some-image-url")).toBeInTheDocument();
  });

  it("should upload file", async (): Promise<void> => {
    global.URL.createObjectURL = jest.fn();
    const { getByTestId, getByText } = render(TestComponent);

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

    await waitFor((): void => {
      userEvent.upload(fileInput, mockFile);
      expect(getByText("hello.png")).toBeInTheDocument();
    });
  });

  it("should change language", (): void => {
    const { getByText } = render(TestComponent);

    fireEvent.click(getByText("English"));
    fireEvent.click(getByText("Serbian"));

    expect(getByText("Serbian")).toBeInTheDocument();
  });

  it("should convert image url to text", async (): Promise<void> => {
    const mockResult = {
      data: {
        text: "converted value",
      },
    } as Tesseract.RecognizeResult;
    (Tesseract.recognize as jest.Mock).mockResolvedValue(mockResult);
    global.URL.createObjectURL = jest.fn();

    const { getByTestId, getByText, queryByTestId } = render(TestComponent);

    const fileInput = getByTestId("image-url-input");

    fireEvent.change(fileInput, { target: { value: "some image url" } });

    await waitFor((): void => {
      fireEvent.click(getByText("Convert"));

      expect(convertImageToText).toHaveBeenCalled();
      expect(queryByTestId("error-banner")).not.toBeInTheDocument();
    });
  });

  it("should close error banner", async (): Promise<void> => {
    const { getByText, getByTestId, queryByTestId } = render(TestComponent);

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
