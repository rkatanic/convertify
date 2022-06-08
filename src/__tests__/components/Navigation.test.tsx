import { fireEvent, render } from "@testing-library/react";
import Navigation from "../../components/Navigation";
import { ConversionOption } from "../../types/ConversionOption";

describe("Navigation", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <Navigation
        isLoading={false}
        conversionOption={ConversionOption.FILE_UPLOAD}
        changeConversionOption={jest.fn}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should display disabled buttons", (): void => {
    const { getByText } = render(
      <Navigation
        isLoading={true}
        conversionOption={ConversionOption.FILE_UPLOAD}
        changeConversionOption={jest.fn}
      />
    );

    expect(getByText("File Upload")).toHaveAttribute("disabled");
    expect(getByText("By Link")).toHaveAttribute("disabled");
  });

  it.each([
    [ConversionOption.FILE_UPLOAD, "File Upload"],
    [ConversionOption.BY_LINK, "By Link"],
  ])(
    "should change conversion option to %s when clicked on %s",
    (option: ConversionOption, link: string): void => {
      const mockChangeConversionOption = jest.fn();
      const { getByText } = render(
        <Navigation
          isLoading={false}
          conversionOption={ConversionOption.FILE_UPLOAD}
          changeConversionOption={mockChangeConversionOption}
        />
      );

      fireEvent.click(getByText(link));

      expect(mockChangeConversionOption).toHaveBeenCalledWith(option);
    }
  );
});
