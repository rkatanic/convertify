import { render } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Home from "../../components/Home";

jest.mock("react-router-dom", (): any => {
  const actualImplementation = jest.requireActual("react-router-dom");
  return {
    ...actualImplementation,
    useLocation: jest.fn(),
  };
});

describe("Home", (): void => {
  beforeEach((): void => {
    (useLocation as jest.Mock).mockImplementation(() => ({
      pathname: "/test-route",
    }));
  });

  it("should render", (): void => {
    const TestComponent = (
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const { baseElement } = render(TestComponent);

    expect(baseElement).toMatchSnapshot();
  });
});
