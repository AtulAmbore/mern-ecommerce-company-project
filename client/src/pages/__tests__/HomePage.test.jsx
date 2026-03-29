import { render, screen } from "@testing-library/react";
import { HomePage } from "../HomePage";

describe("HomePage", () => {
  test("renders homepage headings", () => {
    render(<HomePage />);

    expect(screen.getByText("HomePage - 1")).toBeInTheDocument();
    expect(screen.getByText("HomePage - 2")).toBeInTheDocument();
    expect(screen.getByText("HomePage - 3")).toBeInTheDocument();
  });

  test("renders last heading", () => {
    render(<HomePage />);

    expect(screen.getByText("HomePage - 10")).toBeInTheDocument();
  });

  test("renders multiple headings", () => {
    render(<HomePage />);

    const headings = screen.getAllByRole("heading");

    expect(headings.length).toBeGreaterThan(1);
  });
});
