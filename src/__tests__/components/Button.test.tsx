import { fireEvent, render } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<Button text="text" onClick={jest.fn()} />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button text="text" onClick={mockOnClick} />);

    fireEvent.click(getByText("text"));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
