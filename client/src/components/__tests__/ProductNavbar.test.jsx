import { render, screen, fireEvent } from "@testing-library/react";
import { ProductNavbar } from "../ProductNavbar";
import { vi } from "vitest";

describe("ProductNavbar", () => {
  test("renders search input", () => {
    render(<ProductNavbar inputValue="" setInputValue={() => {}} />);

    const input = screen.getByPlaceholderText(/search by title/i);

    expect(input).toBeInTheDocument();
  });

  //   test("renders Sort By section", () => {
  //     render(<ProductNavbar inputValue="" setInputValue={() => {}} />);

  //     expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  //   });

  test("renders Sort By heading", () => {
    render(<ProductNavbar inputValue="" setInputValue={() => {}} />);

    const heading = screen.getByRole("heading", { name: /sort by/i });

    expect(heading).toBeInTheDocument();
  });

  test("displays the input value", () => {
    render(<ProductNavbar inputValue="iphone" setInputValue={() => {}} />);

    const input = screen.getByDisplayValue("iphone");

    expect(input).toBeInTheDocument();
  });

  test("calls setInputValue when typing", () => {
    const mockSetInputValue = vi.fn();

    render(<ProductNavbar inputValue="" setInputValue={mockSetInputValue} />);

    const input = screen.getByPlaceholderText(/search by title/i);

    fireEvent.change(input, { target: { value: "laptop" } });

    expect(mockSetInputValue).toHaveBeenCalledWith("laptop");
  });

  test("renders sort options", () => {
    render(<ProductNavbar inputValue="" setInputValue={() => {}} />);

    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });
});
