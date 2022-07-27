import { fireEvent, render } from "@testing-library/react";
import CyrilicToLatinConverter from "../../components/CyrilicToLatinConverter";
import { MemoryRouter, useLocation } from "react-router-dom";

jest.mock("react-router-dom", (): any => {
  const actualImplementation = jest.requireActual("react-router-dom");
  return {
    ...actualImplementation,
    useLocation: jest.fn(),
  };
});

describe("CyrilicToLatinConverter", (): void => {
  const TestComponent = (
    <MemoryRouter>
      <CyrilicToLatinConverter />
    </MemoryRouter>
  );

  beforeEach((): void => {
    (useLocation as jest.Mock).mockImplementation(() => ({
      pathname: "/test-route",
    }));
  });

  it("should render", (): void => {
    const { baseElement } = render(TestComponent);

    expect(baseElement).toMatchSnapshot();
  });

  it("should convert text from cyrilic to latin letters", (): void => {
    const { getByLabelText, getByText } = render(TestComponent);

    fireEvent.change(getByLabelText("Input"), {
      target: {
        value:
          "Ћирилица је писмо које се користи у неколико словенских језика, као што су: белоруски, бугарски, македонски, руски, русински, српски и украјински",
      },
    });

    expect(
      getByText(
        "Ćirilica je pismo koje se koristi u nekoliko slovenskih jezika, kao što su: beloruski, bugarski, makedonski, ruski, rusinski, srpski i ukrajinski"
      )
    ).toBeInTheDocument();
  });
});
