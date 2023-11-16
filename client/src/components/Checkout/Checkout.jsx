import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import Autocomplete from "react-google-autocomplete";

function Checkout() {
  // Import context
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    return () => {
      setCartItems([]);
    };
  }, [setCartItems]);

  //
  const [address, setAddress] = useState("");

  return (
    <div>
      <Autocomplete
        apiKey={"AIzaSyC6GBKCKATV1G1E2EjRKlzk8TvHzi9EWX0"}
        onPlaceSelected={(place) => {
          setAddress(place.formatted_address);
        }}
        options={{
          types: ["address"],
          componentRestrictions: { country: "AU" }, // Restrict to Australia
        }}
        placeholder="Search for address"
        className="w-100"
      />
    </div>
  );
}
export default Checkout;
