import React from 'react';


const PointsOfInterest = (props) => (
  <div className="poi-details">
  <h3>Points Of Interest</h3>
    <div className="poi-list-container">
      {props.points.map((point) => (
        <div key={point.place_id} className="point-card" onClick={() => {console.log(point.geometry.location)}}>
          {<span>{point.name}</span>}
          {<span>{point.rating} of 5</span>}
          {<span>{point.category}</span>}
          {<span>{point.types.filter(type => type !== 'point_of_interest' && type !== 'establishment')}
          </span>}
        </div>
      ))}
    </div>
  </div>
)

export default PointsOfInterest;