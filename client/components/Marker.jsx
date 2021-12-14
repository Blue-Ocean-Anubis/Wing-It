import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Marker = (props) => {

  const [mouseOn, setMouseOver] = useState(false);

  let handleMouseEnter = () => {
    setMouseOver(true);
  }

  let handleMouseLeave = () => {
    setMouseOver(false);
  }

  // console.log('props of each: ', props)
  return (
    <div className="marker">
      <FontAwesomeIcon icon={faMapMarkerAlt} size='4x' color={props.name ? "DarkOrange" : "grey"} onClick={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
      {mouseOn ? <div className="marker-info" onMouseEononnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span className="marker-name">
          {props.name}
        </span>
        <span className="marker-address">
          {props.address}
        </span>
      </div> : ''}
      {/* <img src={props.businessInfo}/> */}
    </div>
  )
};

export default Marker;