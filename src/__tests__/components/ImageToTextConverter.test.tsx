import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should change language", (): void => {
    const { getByText } = render(<ImageToTextConverter />);

    fireEvent.click(getByText("English"));
    fireEvent.click(getByText("Serbian"));

    expect(getByText("Serbian")).toBeInTheDocument();
  });

  it("should close error banner", async (): Promise<void> => {
    (convertImageToText as jest.Mock).mockRejectedValue(() => {});

    const { getByText, getByTestId, queryByTestId } = render(
      <ImageToTextConverter />
    );

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.txt", { type: "text" });

    await waitFor(() => {
      userEvent.upload(fileInput, mockFile);
    });
    fireEvent.click(getByText("Convert"));

    expect(getByTestId("error-banner")).toBeInTheDocument();

    fireEvent.click(getByText("close.svg"));

    expect(queryByTestId("error-banner")).not.toBeInTheDocument();
  });
});
