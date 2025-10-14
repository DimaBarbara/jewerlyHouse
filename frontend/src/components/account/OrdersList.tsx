// import { SyncLoader } from "react-spinners";

// import { useGetCartByUserQuery } from "../../redux/cart/CartApi";
// import { useSelector } from "react-redux";
// import { selectIsAuthenticated } from "../../redux/auth/selectors";
import type { ICartItem } from "../../models/ICartItem";
import CartItem from "../cart/CartItem";

const OrdersList = () => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const {
  //   data: orders,
  //   error,
  //   isLoading,
  // } = useGetOr(undefined, {
  //   skip: !isAuthenticated,
  // });
  // const items = isAuthenticated
  //   ? cart?.cartItems || []
  //   : []

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <SyncLoader color="#36d7b7" />
  //     </div>
  //   );
  // }

  // if (error) {
  //   let errorMessage = "An unknown error occurred.";
  //   if ("status" in error) {
  //     errorMessage = `Error ${error.status}: Failed to load items.`;
  //   } else if ("message" in error) {
  //     errorMessage = `Connection problem: ${error.message}`;
  //   }
  //   return <div className="text-red-500 text-center py-4">{errorMessage}</div>;
  // }

  // if (items.length === 0) {
  //   return (
  //     <div className="flex flex-col items-center gap-10 !mx-auto w-[850px] h-[500px] bg-gray-300 !pt-10 !px-16 overflow-hidden !mb-5 !mt-5">
  //       <h4 className="text-2xl font-semibold text-gray-700">
  //         Your cart is empty.
  //       </h4>
  //       <p className="text-gray-500 mt-2">Time to add some items!</p>
  //     </div>
  //   );
  // }
const items = []
  return (
    <div className="flex flex-col items-start gap-10 !mx-auto w-[850px] h-[500px] bg-gray-300 !pt-10 !px-16 overflow-hidden !mb-5 !mt-5">
      {items.map((item: ICartItem) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default OrdersList;
