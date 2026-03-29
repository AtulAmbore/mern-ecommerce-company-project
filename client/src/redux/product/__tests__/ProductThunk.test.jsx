import { describe, it, expect, vi, beforeEach } from "vitest";
import { axiosInstance } from "../../../api/axiosInstance";
import { getProductsThunk } from "../ProductThunk";

vi.mock("../../../api/axiosInstance", () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe("ProductThunk", () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fulfilled when API call succeeds", async () => {
    const mockProducts = {
      msg: "Products fetched",
      products: [
        { _id: "1", title: "iPhone", price: 1000 },
        { _id: "2", title: "Samsung", price: 900 },
      ],
    };

    axiosInstance.get.mockResolvedValue({
      data: mockProducts,
    });

    const thunk = getProductsThunk();

    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(axiosInstance.get).toHaveBeenCalledWith("/api/products");
    expect(result.type).toBe("/api/products/fulfilled");
    expect(result.payload).toEqual(mockProducts);
  });

  it("dispatches rejected when API call fails", async () => {
    const mockError = {
      response: {
        data: { msg: "Failed to fetch products" },
      },
    };

    axiosInstance.get.mockRejectedValue(mockError);

    const thunk = getProductsThunk();

    const result = await thunk(mockDispatch, mockGetState, undefined);

    expect(axiosInstance.get).toHaveBeenCalledWith("/api/products");
    expect(result.type).toBe("/api/products/rejected");
    expect(result.payload).toEqual(mockError.response.data);
  });
});
