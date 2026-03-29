import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getProductsThunk } from "../redux/product/ProductThunk";
import { getCartThunk } from "../redux/cart/CartThunk";

export function ProductPage() {
  const dispatch = useDispatch();

  const { isLoading, products } = useSelector(
    (state) => state.productKey.getProductsState,
  );

  const { cartProducts } = useSelector((state) => state.cartKey.cartState);

  // console.log("ProductPage - products");
  // console.log(products[0]._id);
  // console.log("ProductPage - cartProducts");
  // console.log(cartProducts);

  const cartProductIds = new Set(cartProducts?.map((item) => item.product._id));

  const [inputValue, setInputValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  const fetchProductData = async () => {
    try {
      const result = await dispatch(getProductsThunk()).unwrap();
      toast.success(result.msg);
    } catch (err) {
      // console.log("fetchProductData2 - err");
      // console.log(err);
      toast.error(err.msg);
    }
  };

  const fetchCart = async () => {
    try {
      const result = await dispatch(getCartThunk()).unwrap();
      // console.log("fetchCart - result");
      // console.log(result.cart.items);
      toast.success(result.msg);
    } catch (err) {
      // console.log("fetchCart - err");
      // console.log(err);
      toast.error(err.msg);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [dispatch]);

  let filteredProducts = [...products];

  if (inputValue) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }

  switch (sortValue) {
    case "price":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "a-z":
      filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "rating(low-to-high)":
      filteredProducts.sort((a, b) => a.rating - b.rating);
      break;
    case "rating(high-to-low)":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col gap-5 w-full h-full overflow-hidden">
      <div className="w-full h-1/10 bg-white flex justify-around py-2 fixed">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          name="search"
          id="search"
          className="w-6/10 border border-gray-400 px-4 rounded-2xl py-2 outline-none text-gray-500"
          placeholder="Search by title"
          spellCheck={false}
        />
        <div className="w-2/10 flex items-center justify-around">
          <h1 className="font-bold text-gray-500 text-xl">Sort By</h1>
          <div className="border border-gray-400 text-gray-500 rounded-2xl px-3">
            <select
              value={sortValue || ""}
              onChange={(e) => setSortValue(e.target.value)}
              className="border-gray-400 outline-none text-gray-500 rounded-2xl px-3 py-2"
            >
              <option value="" disabled>
                Sort By
              </option>
              <option value="price">Price</option>
              <option value="a-z">A → Z</option>
              <option value="z-a">Z → A</option>
              <option value="rating(low-to-high)">Rating(low-to-high)</option>
              <option value="rating(high-to-low)">Rating(high-to-low)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="w-full pt-18 h-full overflow-y-auto">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="w-full grid grid-cols-5 gap-2 h-full overflow-y-auto thin-scrollbar">
            {filteredProducts.map((product) => {
              const isInCart = cartProductIds.has(product._id);
              return (
                <ProductCard
                  key={product.productId}
                  product={product}
                  isInCart={isInCart}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
