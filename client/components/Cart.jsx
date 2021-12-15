import React, { useState, useEffect, useContext } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext.jsx";

const Cart = () => {
  const [list, getList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/cart", {
        params: {
          uid: user.uid,
        },
      })
      .then((list) => {
        console.log("Success: ", list);
        getList(list);
      })
      .catch((err) => {
        console.log("Error retrieving user list: >>>>", err);
      });
  }, []);

  if (list.length === 0) {
    return null;
  } else {
    return (
      <div className="page">
        <Nav />
        <h1>My Trip Destinations</h1>
        {list.data.map(location => {
          return <li>{location.name}</li>
        })}
      </div>
    );
  }
};

export default Cart;
