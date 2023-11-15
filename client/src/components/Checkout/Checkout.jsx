import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

function Checkout() {
  // Import context
  const { cartItems, setCartItems } = useContext(CartContext);
  console.log(cartItems);
  useEffect(() => {
    return () => {
      setCartItems([]);
    };
  }, [setCartItems]);

  return <div>de</div>;
}
export default Checkout;
