import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartThunk, removeFromCartThunk } from "../redux/cart/CartThunk";
import toast from "react-hot-toast";
export function ProductCard({ product, isInCart }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    _id: id,
    productId,
    title,
    category,
    thumbnail: image,
    brand,
    price,
    rating,
  } = product;

  // console.log("ProductCard - id - ", id);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<IoIosStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<IoIosStarOutline key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  const handleAddTocart = async () => {
    try {
      const result = await dispatch(
        addToCartThunk({
          productId: id, // ✅ use `id`
          quantity: 1, // ✅ send quantity
        }),
      ).unwrap();
      toast.success(result.msg);
      // console.log("handleAddTocart result - ");
      // console.log(result);
    } catch (err) {
      // console.log("handleAddTocart error - ");
      // console.log(err);
      toast.error(err.msg);
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      const result = await dispatch(
        removeFromCartThunk({ productId: id }),
      ).unwrap();
      toast.success(result.msg);
    } catch (err) {
      // console.log("handleRemoveFromCart error - ");
      // console.log(err);
      toast.error(err.msg);
    }
  };

  return (
    <div
      // onClick={() => navigate(`/products/${productId}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
    >
      {/* Image */}
      <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-2 grow">
        <h2 className="font-semibold text-gray-800 line-clamp-2">{title}</h2>

        <div className="text-sm text-gray-500 flex justify-between">
          <span>{brand}</span>
          <span className="capitalize">{category}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1">{renderStars()}</div>
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-red-500 line-through">
            ${(price * 1.18).toFixed(2)}
          </span>
          <span className="text-xs text-red-500 font-semibold">-18%</span>
        </div>
      </div>

      {/* Button */}
      <button
        // onClick={(e) => {
        //   e.stopPropagation();
        //   dispatch(addToCart({ ...product, quantity: 1 })); // Default quantity = 1
        // }}
        // handleRemoveFromCart
        onClick={() => (isInCart ? handleRemoveFromCart() : handleAddTocart())}
        className="mt-4 bg-gray-800 text-white font-semibold py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
      >
        {isInCart ? "Remove" : "Add"}
      </button>
    </div>
  );
}
