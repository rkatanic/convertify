import { fireEvent, render } from "@testing-library/react";
import Languages from "../../components/Languages";

describe("Languages", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <Languages selectedLanguage="eng" setLanguage={jest.fn} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call set language", (): void => {
    const mockSetLanguage = jest.fn();
    const { getByTestId } = render(
      <Languages selectedLanguage="eng" setLanguage={mockSetLanguage} />
    );

    fireEvent.change(getByTestId("languages"), { target: { value: "srp" } });

    expect(mockSetLanguage).toHaveBeenNthCalledWith(1, "srp");
  });
});
