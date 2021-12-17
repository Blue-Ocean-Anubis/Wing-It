import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faMapPin, faTimes, faCircle} from '@fortawesome/free-solid-svg-icons';

const Marker = (props) => {

  const [mouseOn, setMouseOver] = useState(false);

  let handleMouseEnter = (event) => {
    event.stopPropagation();
    setMouseOver(true);
  }

  let handleMouseLeave = (event) => {
    event.stopPropagation();
    setMouseOver(false);
  }

  useEffect(() => {
    // console.log('marker props: ', props)
  })
  const style = (props.inCart ? {
    zIndex: 4
  } : {zIndex: 0});

  return (
    <div >
      <div className="marker" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleMouseEnter}  style={style}>
      <div className="marker-index">{props.index}</div>
      <FontAwesomeIcon icon={faMapMarker} size='3x' color={props.inCart ? "#b56100" : "grey"}  className="pin" />
      {/* <img src={'https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png'}/> */}
      </div>
      {mouseOn ? <div className="marker-info" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{zIndex: 5}}>
        <FontAwesomeIcon icon={faTimes} size='sm' className="exit-marker-info" onClick={handleMouseLeave}/>
        {props.code ? <div className='marker-airport-code'>{props.code}</div> : <img src={props.photo} className="marker-photo"/>}

        <div className="marker-name">
          {props.name}
        </div>
        <div className="marker-address">
          {props.address}
        </div>
        {/* <span>{props.details ? props.details.international_phone_number : ''}</span>
        <a href={props.details ? props.details.website : ''} >website</a> */}
      </div> : ''}
      {/* <img src={props.businessInfo}/> */}
    </div>
  )
};

export default Marker;