import { fireEvent, getByRole, render } from "@testing-library/react";
import Error from "../../components/Error";
import { ErrorType } from "../../types/ErrorType";

describe("Error", (): void => {
  it("should call onClose", (): void => {
    const mockOnClose = jest.fn();
    const { getByTestId } = render(
      <Error onClose={mockOnClose} error={ErrorType.UNSUPPORTED_FILE_FORMAT} />
    );

    fireEvent.click(getByTestId("error-icon-close"));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should initially be without error message", (): void => {
    const { baseElement } = render(
      <Error onClose={jest.fn} error={ErrorType.NO_ERROR} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with unsupported file format message", (): void => {
    const { getByText } = render(
      <Error onClose={jest.fn} error={ErrorType.UNSUPPORTED_FILE_FORMAT} />
    );

    expect(getByText("Unsupported file format.")).toBeInTheDocument();
  });

  it("should render with conversion failed message", (): void => {
    const { getByText } = render(
      <Error onClose={jest.fn} error={ErrorType.CONVERSION_FAILED} />
    );

    expect(
      getByText("Whoops! Image conversion failed. Please try again.")
    ).toBeInTheDocument();
  });

  it("should render with maximum file upload size exceeded message", (): void => {
    const { getByText } = render(
      <Error onClose={jest.fn} error={ErrorType.MAX_FILE_SIZE_EXCEEDED} />
    );

    expect(
      getByText("Maximum file size exceeded! Please use file up to 5 MB.")
    ).toBeInTheDocument();
  });
});
