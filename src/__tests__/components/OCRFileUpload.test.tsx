import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OCRFileUpload from "../../components/OCRFileUpload";
import { ErrorType } from "../../types/ErrorType";

describe("OCRFileUpload", (): void => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
  });

  it("should render", (): void => {
    const { baseElement } = render(
      <OCRFileUpload setImage={jest.fn} handleError={jest.fn} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should upload image", async (): Promise<void> => {
    const mockSetImage = jest.fn();
    const { getByTestId } = render(
      <OCRFileUpload setImage={mockSetImage} handleError={jest.fn} />
    );

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

    await waitFor(() => {
      userEvent.upload(fileInput, mockFile);
    });

    expect(mockSetImage).toHaveBeenCalled();
  });

  it("should handle error when file is unsupported format", async (): Promise<void> => {
    const mockHandleError = jest.fn();
    const { getByTestId } = render(
      <OCRFileUpload setImage={jest.fn} handleError={mockHandleError} />
    );

    const fileInput = getByTestId("ocr-file-upload-input");
    const mockFile = new File(["hello"], "hello.txt", { type: "text" });

    await waitFor(() => {
      userEvent.upload(fileInput, mockFile);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      ErrorType.UNSUPPORTED_FILE_FORMAT
    );
  });

  it("should handle error when maximum file size is exceeded", async (): Promise<void> => {
    const mockHandleError = jest.fn();
    const { getByTestId } = render(
      <OCRFileUpload setImage={jest.fn} handleError={mockHandleError} />
    );

    const FileInput = getByTestId("ocr-file-upload-input");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    Object.defineProperty(file, "size", { value: 10_000 * 10_000 + 1 });

    await waitFor(() => {
      userEvent.upload(FileInput, file);
    });

    expect(mockHandleError).toHaveBeenNthCalledWith(
      1,
      ErrorType.MAX_FILE_SIZE_EXCEEDED
    );
  });
});
