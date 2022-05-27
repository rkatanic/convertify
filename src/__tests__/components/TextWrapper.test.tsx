import { fireEvent, render } from "@testing-library/react";
import TextWrapper from "../../components/TextWrapper";

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe("TestWrapper", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<TextWrapper text="text" />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should copy text to clipboard", (): void => {
    jest.spyOn(navigator.clipboard, "writeText");
    const { getByText } = render(<TextWrapper text="text" />);

    fireEvent.click(getByText("copy.svg"));

    expect(navigator?.clipboard?.writeText).toHaveBeenNthCalledWith(1, "text");
  });
});
