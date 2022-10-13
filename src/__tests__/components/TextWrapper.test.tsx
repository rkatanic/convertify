import { fireEvent, render } from "@testing-library/react";
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
    const { getByTestId } = render(<TextWrapper text="text" />);

    fireEvent.click(getByTestId("copy-icon"));

    expect(copyText).toHaveBeenNthCalledWith(1, "text");
  });

  it("should download text to .txt file", async (): Promise<void> => {
    const { getByTestId } = render(<TextWrapper text="text" />);

    fireEvent.click(getByTestId("download-icon"));

    expect(downloadTextFile).toHaveBeenNthCalledWith(1, "text");
  });
});
