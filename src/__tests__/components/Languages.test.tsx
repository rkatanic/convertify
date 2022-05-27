import { fireEvent, render } from "@testing-library/react";
import Languages from "../../components/Languages";

describe("Languages", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <Languages
        selectedLanguage={{ key: "eng", value: "English" }}
        setLanguage={jest.fn}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should display languages list", (): void => {
    const { getByText, baseElement } = render(
      <Languages
        selectedLanguage={{ key: "eng", value: "English" }}
        setLanguage={jest.fn()}
      />
    );

    fireEvent.click(getByText("English"));

    expect(baseElement).toMatchSnapshot();
  });

  it("should call setLanguage and close dropdown", (): void => {
    const mockSetLanguage = jest.fn();
    const { getByText, queryByTestId } = render(
      <Languages
        selectedLanguage={{ key: "eng", value: "English" }}
        setLanguage={mockSetLanguage}
      />
    );

    fireEvent.click(getByText("English"));
    fireEvent.click(getByText("Serbian"));

    expect(queryByTestId("languages-list")).not.toBeInTheDocument();
    expect(mockSetLanguage).toHaveBeenNthCalledWith(1, {
      key: "srp",
      value: "Serbian",
    });
  });

  it("should close languages dropdown when clicked outside", (): void => {
    const mockSetLanguage = jest.fn();
    const { getByText, queryByTestId } = render(
      <Languages
        selectedLanguage={{ key: "eng", value: "English" }}
        setLanguage={mockSetLanguage}
      />
    );

    fireEvent.click(getByText("English"));
    fireEvent.mouseDown(document);

    expect(queryByTestId("languages-list")).not.toBeInTheDocument();
    expect(mockSetLanguage).not.toHaveBeenCalled();
  });
});
