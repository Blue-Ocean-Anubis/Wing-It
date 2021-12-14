import React from 'react';


const PointsOfInterest = (props) => (
    <div className="poi-details">
    <h3>Points Of Interest</h3>
      <div className="airport-list-container">
      {props.points.map((point) => (
        <div key={point.name} className="point-card" onClick={() => {console.log(point.location)}}>
          {<span key={point.name}>{point.name}</span>}
          {<span key={point.rank}>Ranked {point.rank} of 5</span>}
          {<span key={point.category}>{point.category}</span>}
          {<span key='poi-tags' onClick={() => {alert(point.tags)}}>Click Me to See Tags</span>}
        </div>
        ))}
      </div>
    </div>
)

export default PointsOfInterest;