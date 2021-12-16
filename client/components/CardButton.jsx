import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";

const CardButton = ({ cartItem, updateCart, cartList }) => {
  const [isLoading, setLoading] = useState(false);
  const [inDatabase, toggleDatabase] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) {
      axios
        .put("/toggleCart", {
          uid: user.uid,
          cartItem: JSON.stringify(cartItem),
        })
        .then(() => {
          setLoading(false);
          inDatabase ? toggleDatabase(false) : toggleDatabase(true);
          updateCart(); // UPDATE HOME STATE cartList VALUE
        })
        .catch((err) => {
          console.log("Add Item Error: ", err);
        });
    }
  }, [isLoading]);

  // SET BUTTON STATUS BASED ON WHETHER OR NOT ITEM IS IN CART
  useEffect(() => {
    let cartPlaceIDs = cartList.data
      ? cartList.data.map((each) => {
          return each.place_id ? each.place_id : each.code;
        })
      : [];
    toggleDatabase(
      cartPlaceIDs.includes(cartItem.place_id) ||
        cartPlaceIDs.includes(cartItem.code)
    );
  }, []);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="dark"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
      style={inDatabase ? { backgroundColor: "#b56100" } : {}}
    >
      {isLoading ? "Loading…" : inDatabase ? "Remove Item" : "Add Item"}
    </Button>
  );
};

export default CardButton;
