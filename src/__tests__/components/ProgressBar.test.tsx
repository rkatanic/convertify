import { render } from "@testing-library/react";
import ProgressBar from "../../components/ProgressBar";

describe("ProgressBar", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<ProgressBar progress={0.52} />);

    expect(baseElement).toMatchSnapshot();
  });
});
