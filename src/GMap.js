import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GMap extends Component {
  static defaultProps = {
    center: {
      lat: 34.06,
      lng:-118.4506839,
    },
    zoom: 11
  };

  render() {
      let center= this.props.lat ? {lat:this.props.lat, lng: this.props.long} : this.props.center
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAFXlwlDVsCyLkNKxgWPyeSAw4lPDyJeEY'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={center}
          zoom={17}
        >
        <Marker
            lat={center.lat}
            lng={center.lng}
            name="THIS PLACE"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GMap;
