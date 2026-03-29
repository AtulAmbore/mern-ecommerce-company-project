import { render, screen } from "@testing-library/react";
import { CartPage } from "../CartPage";

describe("CartPage", () => {
  test("renders CartPage text", () => {
    render(<CartPage />);

    expect(screen.getByText(/cartpage/i)).toBeInTheDocument();
  });

  test("renders cart container", () => {
    render(<CartPage />);

    const container = screen.getByText(/cartpage/i).parentElement;

    expect(container).toBeInTheDocument();
  });
});
