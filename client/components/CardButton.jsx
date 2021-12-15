import React, { useState, useEffect, useContext } from 'react';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext.jsx';

const CardButton = ({ restaurant }) => {
  const [isLoading, setLoading] = useState(false);
  const [inDatabase, toggleDatabase] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) {
      axios.put('/toggleCart', {
        uid: user.uid,
        cartItem: JSON.stringify(restaurant)
      })
      .then(() => {
        setLoading(false);
        inDatabase ? toggleDatabase(false) : toggleDatabase(true);
      })
      .catch(err => {
        console.log('Add Item Error: ', err);
      })
    }
  }, [isLoading]);

  const handleClick = () => setLoading(true);

  return (
    <Button
      variant="dark"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : inDatabase ? 'Remove Item' : 'Add Item'}
    </Button>
  );
}

export default CardButton;