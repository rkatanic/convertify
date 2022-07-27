import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

jest.mock("react-router-dom", (): any => {
  const actualImplementation = jest.requireActual("react-router-dom");
  return {
    ...actualImplementation,
    useLocation: jest.fn(),
  };
});

describe("Breadcrumbs", (): void => {
  it("should render", (): void => {
    (useLocation as jest.Mock).mockImplementation(() => {
      return { pathname: "/test-route" };
    });

    const { baseElement } = render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with second route active", (): void => {
    (useLocation as jest.Mock).mockImplementation(() => {
      return { pathname: "/test-route" };
    });

    const { baseElement, getByText } = render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    fireEvent.click(getByText("test route"));

    expect(baseElement).toMatchSnapshot();
  });
});
