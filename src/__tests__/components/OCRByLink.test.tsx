import { fireEvent, render } from "@testing-library/react";
import OCRByLink from "../../components/OCRByLink";

describe("OCRByLink", (): void => {
  it("should call set image", (): void => {
    const mockSetImage = jest.fn();
    const { getByTestId } = render(
      <OCRByLink image="image url" setImage={mockSetImage} />
    );
    fireEvent.change(getByTestId("ocr-image-link"), {
      target: { value: "new image url" },
    });

    expect(mockSetImage).toHaveBeenCalledWith("new image url");
  });

  it("should render", (): void => {
    const { baseElement } = render(
      <OCRByLink image="image url" setImage={jest.fn} />
    );

    expect(baseElement).toMatchSnapshot();
  });
});
