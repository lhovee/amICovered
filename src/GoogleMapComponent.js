import React from "react";
import GoogleMapReact, { fitBounds } from 'google-map-react';
import { useEffect, useState } from "react";

const GoogleMapComponent = ({ text }) => <div className="map-marker-icon">
  <p style={{
    color: 'white',
    background: 'purple',
    shadow: '4px 8px #000000',
    padding: '7px 9px',
    fontSize: '5px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
    }}>
        {text}
    </p>,
  </div>;

export default function SimpleMap(props){
  const geocoder = new window.google.maps.Geocoder();
  const [markers, setMarkers] = useState([{
    lat: 39.099724, lng: -94.578331,
    address: "default"
  }]);

  useEffect(() => {
    props.careProviders.forEach((p) => {
      const address = `${p.street}, ${p.city}, ${p.state} ${p.zip}`;
      const present = markers.some((m) => m.address === address);
      if (!present) {
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status === 'OK') {
            // lat, long
            const latLong = {
              lat: results[0].geometry.bounds?.vb?.lo,
              lng: results[0].geometry.bounds?.Ra?.lo,
              address: address
            }
            setMarkers([...markers, latLong]);
          } else {
            console.log('Geocode on provider address was not successful for the following reason: ' + status);
          }
        });
      }
    });
  }, [markers])

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE }}
        center={props.userLocation || { lat: 39.099724, lng: -94.578331 }}
        defaultZoom={11}
      >
        {markers.map((m, index) => {
          return <GoogleMapComponent
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
