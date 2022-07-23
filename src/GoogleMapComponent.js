import React from "react";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";

const AnyReactComponent = ({ text }) => <div className="map-marker-icon">
  <p style={{
    color: 'white', 
    background: 'grey',
    padding: '8px 10px',
    fontSize: '5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'}}>{text}</p>
  </div>;

export default function SimpleMap(){
  const defaultProps = {
    center: {
      lat: 39.099724,
      lng: -94.578331
    },
    zoom: 11
  };
  const places = [
    {
    street: '1100 Main St',
    city: "Kansas City",
    state: "MO",
    zip: "64105",
  },
  {
    street: '107 W 9th St',
    city: "Kansas City",
    state: "MO",
    zip: "64105",
  }
];

  const geocoder = new window.google.maps.Geocoder();
  const [markers, setMarkers] = useState([{lat: 39.099724, lng: -94.578331}]);
  // places.forEach((p) => {
  //   const address = `${p.street}, ${p.city}, ${p.state} ${p.zip}`;
  //   geocoder.geocode( { 'address': address}, function(results, status) {
  //     if (status === 'OK') {
  //       // lat, long
  //       const latLong = {
  //         lat: results[0].geometry.bounds?.vb?.lo,
  //         lng: results[0].geometry.bounds?.Ra?.lo
  //       }
  //       console.log(address, latLong);
  //       setMarkers([markers, latLong]);
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // });
  console.log(markers);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map((m, index) => {
          return <AnyReactComponent
          lat={m.lat}
          lng={m.lng}
          key={index}
          text="1"
        />
        })}
      </GoogleMapReact>
    </div>
  );
}
