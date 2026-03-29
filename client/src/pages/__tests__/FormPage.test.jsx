import { render, screen } from "@testing-library/react";
import { FormPage } from "../FormPage";

describe("FormPage", () => {
  test("renders FormPage text", () => {
    render(<FormPage />);

    expect(screen.getByText(/formpage/i)).toBeInTheDocument();
  });

  test("component renders without crashing", () => {
    const { container } = render(<FormPage />);

    expect(container).toBeInTheDocument();
  });
});
