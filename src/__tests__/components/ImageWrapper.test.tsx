import { render } from "@testing-library/react";
import ImageWrapper from "../../components/ImageWrapper";

describe("ImageWrapper", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<ImageWrapper />);

    expect(baseElement).toMatchSnapshot();
  });
});
