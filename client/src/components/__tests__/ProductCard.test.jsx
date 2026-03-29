/*
🧠 What This Test Covers
Test	What it verifies
Title	product title renders
Image	product image renders
Brand	brand text appears
Category	category appears
Price	price calculation
Button	Add / Remove text
Add action	dispatch called
Remove action	dispatch called

This is real-world React testing coverage.
*/

import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../ProductCard";
import { vi } from "vitest";

/* ---------------- MOCKS ---------------- */

// mock navigate
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

// mock redux
const dispatchMock = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
}));

// mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// mock thunks
vi.mock("../../redux/cart/CartThunk", () => ({
  addToCartThunk: vi.fn(() => ({
    unwrap: () => Promise.resolve({ msg: "Added to cart" }),
  })),
  removeFromCartThunk: vi.fn(() => ({
    unwrap: () => Promise.resolve({ msg: "Removed from cart" }),
  })),
}));

/* ---------------- MOCK DATA ---------------- */

const mockProduct = {
  _id: "1",
  productId: "1",
  title: "iPhone 15",
  category: "smartphones",
  thumbnail: "iphone.jpg",
  brand: "Apple",
  price: 999,
  rating: 4.5,
};

/* ---------------- TESTS ---------------- */

describe("ProductCard", () => {
  test("renders product title", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    expect(screen.getByText(/iphone 15/i)).toBeInTheDocument();
  });

  test("renders product image", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    expect(screen.getByRole("img", { name: /iphone 15/i })).toBeInTheDocument();
  });

  test("renders brand and category", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    expect(screen.getByText(/smartphones/i)).toBeInTheDocument();
  });

  test("renders price", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    expect(screen.getByText("$999.00")).toBeInTheDocument();
  });

  test("renders Add button when product not in cart", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test("renders Remove button when product is in cart", () => {
    render(<ProductCard product={mockProduct} isInCart={true} />);

    expect(screen.getByText(/remove/i)).toBeInTheDocument();
  });

  test("calls add to cart when Add button clicked", () => {
    render(<ProductCard product={mockProduct} isInCart={false} />);

    fireEvent.click(screen.getByText(/add/i));

    expect(dispatchMock).toHaveBeenCalled();
  });

  test("calls remove from cart when Remove button clicked", () => {
    render(<ProductCard product={mockProduct} isInCart={true} />);

    fireEvent.click(screen.getByText(/remove/i));

    expect(dispatchMock).toHaveBeenCalled();
  });
});
