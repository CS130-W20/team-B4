import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    return (
      <div>
        <div
          className="pin bounce flex justify-center items-center"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={"hi"}>
            <div className="circ flex justify-center items-center" style={{backgroundColor:'white'}}>
            </div>
        </div>
        <div className="pulse" />
      </div>
    );
  };

export default Marker;
