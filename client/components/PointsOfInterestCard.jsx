import React, { useState } from "react";
import CardButton from "./CardButton.jsx";

const PointsOfInterestCard = ({ point }) => (
  <div className="card">
    {<span className="name">{point.name}</span>}
    {<span>{point.rating} of 5</span>}
    {<span>{point.category}</span>}
    {
      <span>
        {point.types.filter(
          (type) => type !== "point_of_interest" && type !== "establishment"
        )}
      </span>
    }
    <CardButton cartItem={point} />
  </div>
);

export default PointsOfInterestCard;
