import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ProductPage } from "../ProductPage";
import productReducer from "../../redux/product/ProductSlice";
import cartReducer from "../../redux/cart/CartSlice";

// mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// mock dispatch so thunks don't run
const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

// mock ProductCard
vi.mock("../../components/ProductCard", () => ({
  ProductCard: ({ product }) => (
    <div data-testid="product-card">{product.title}</div>
  ),
}));

// mock LoadingSkeleton
vi.mock("../../components/LoadingSkeleton", () => ({
  LoadingSkeleton: () => <div data-testid="loading">Loading...</div>,
}));

const mockProducts = [
  {
    _id: "1",
    productId: 1,
    title: "iPhone",
    price: 1000,
    rating: 4.5,
  },
  {
    _id: "2",
    productId: 2,
    title: "Samsung",
    price: 800,
    rating: 4.2,
  },
];

const createTestStore = (state) =>
  configureStore({
    reducer: {
      productKey: productReducer,
      cartKey: cartReducer,
    },
    preloadedState: state,
  });

const renderProductPage = (state) => {
  const store = createTestStore(state);

  render(
    <Provider store={store}>
      <ProductPage />
    </Provider>,
  );
};

describe("ProductPage", () => {
  test("renders loading skeleton when loading", () => {
    renderProductPage({
      productKey: {
        getProductsState: {
          isLoading: true,
          products: [],
        },
      },
      cartKey: {
        cartState: {
          cartProducts: [],
        },
      },
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("renders products", () => {
    renderProductPage({
      productKey: {
        getProductsState: {
          isLoading: false,
          products: mockProducts,
        },
      },
      cartKey: {
        cartState: {
          cartProducts: [],
        },
      },
    });

    const cards = screen.getAllByTestId("product-card");

    expect(cards.length).toBe(2);
    expect(screen.getByText("iPhone")).toBeInTheDocument();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  test("filters products by search", () => {
    renderProductPage({
      productKey: {
        getProductsState: {
          isLoading: false,
          products: mockProducts,
        },
      },
      cartKey: {
        cartState: {
          cartProducts: [],
        },
      },
    });

    const input = screen.getByPlaceholderText(/search by title/i);

    fireEvent.change(input, { target: { value: "iphone" } });

    expect(screen.getByText("iPhone")).toBeInTheDocument();
    expect(screen.queryByText("Samsung")).not.toBeInTheDocument();
  });

  test("renders sort dropdown", () => {
    renderProductPage({
      productKey: {
        getProductsState: {
          isLoading: false,
          products: mockProducts,
        },
      },
      cartKey: {
        cartState: {
          cartProducts: [],
        },
      },
    });

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
