import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMapPin, faTimes} from '@fortawesome/free-solid-svg-icons';

const Marker = (props) => {

  const [mouseOn, setMouseOver] = useState(false);

  let handleMouseEnter = () => {
    setMouseOver(true);
  }

  let handleMouseLeave = () => {
    setMouseOver(false);
  }

  useEffect(() => {
    // console.log(props.$hover)
  })

  // console.log('props of each: ', props)
  return (
    <div className="marker">
      <FontAwesomeIcon icon={faMapPin} size='2x' color={props.name ? "DarkOrange" : "grey"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseEnter}/>
      {/* <img src={'https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png'}/> */}
      {mouseOn ? <div className="marker-info" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseLeave}>
        <FontAwesomeIcon icon={faTimes} size='sm' className="exit-marker-info" onClick={handleMouseLeave}/>
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