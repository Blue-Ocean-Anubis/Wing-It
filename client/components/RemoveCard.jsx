import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";

const RemoveCard = ({ cartItem, getList, updateCart }) => {
  const [isLoading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) {
      axios
        .put("/toggleCart", {
          uid: user.uid,
          cartItem: JSON.stringify(cartItem),
        })
        .then(() => {
          updateCart();
          axios.get('/cart', {
            params: {
              uid: user.uid
            }
          })
          .then(data => {
            getList(data);
          })
          .catch(err => {
            console.log('Error retrieving updated list: ', err);
          })
        })
        .catch((err) => {
          console.log("Add Item Error: ", err);
        });
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="dark"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? "Loading" : "Remove Item"}
    </Button>
  );
};

export default RemoveCard;
