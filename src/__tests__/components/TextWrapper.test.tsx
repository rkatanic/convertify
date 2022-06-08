import { fireEvent, render, waitFor } from "@testing-library/react";
import TextWrapper from "../../components/TextWrapper";
import { copyText, downloadTextFile } from "../../util/OCRConverterUtils";

jest.mock("../../util/OCRConverterUtils", () => ({
  copyText: jest.fn(),
  downloadTextFile: jest.fn(),
}));

describe("TestWrapper", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<TextWrapper />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should copy text to clipboard", (): void => {
    const { getByText } = render(<TextWrapper text="text" />);

    fireEvent.click(getByText("copy.svg"));

    expect(copyText).toHaveBeenNthCalledWith(1, "text");
  });

  it("should download text to .txt file", async (): Promise<void> => {
    const { getByText } = render(<TextWrapper text="text" />);

    fireEvent.click(getByText("download-file.svg"));

    expect(downloadTextFile).toHaveBeenNthCalledWith(1, "text");
  });
});
