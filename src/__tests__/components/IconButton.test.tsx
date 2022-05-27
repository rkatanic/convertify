import { fireEvent, render } from "@testing-library/react";
import IconButton from "../../components/IconButton";

describe("Icon Button", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <IconButton icon={<>icon</>} onClick={jest.fn()} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <IconButton icon={<>icon</>} onClick={mockOnClick} />
    );

    fireEvent.click(getByText("icon"));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
