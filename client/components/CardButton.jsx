import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";

const CardButton = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button size="sm">Hello There!</Button>
  )
}

export default CardButton;