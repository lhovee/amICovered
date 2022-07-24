import logo from './logo.svg';
import './App.css';
import GoogleMapComponent from './GoogleMapComponent.js';
import { useEffect, useState } from "react";
import DataTable from './assets/DataTable';

import healthCareProvider from './assets/healthCareProvider.json';

function App() {
  const geocoder = new window.google.maps.Geocoder();
  const [userLocation, setUserLocation] = useState({
    lat: 39.099724,
    lng: -94.578331
  });

  // this is so that the map doesn't re-center until the user clicks
  // the search button
  const [userLocationRaw, setUserLocationRaw] = useState({
    lat: 39.099724,
    lng: -94.578331
  });

  function handleChange(e) {
    const { value } = e.target;
    if (!value || value.length !== 5) return;
    geocoder.geocode( { 'address': value }, function(results, status) {
      if (status === 'OK') {
        // lat, long
        const latLong = {
          lat: results[0].geometry.bounds?.vb?.lo,
          lng: results[0].geometry.bounds?.Ra?.lo,
        }
        setUserLocationRaw(latLong);
        console.log(latLong);
      } else {
        console.log('Geocode on user location was not successful for the following reason: ' + status);
      }
    });
  }

  function handleSearch() {
    //
  }

  const careTypes = healthCareProvider.map((p) => p.careTypes).flat();
  const insuranceProviders = healthCareProvider.map((p) => p.insuranceProviders).flat();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='app-content'>
        <div className='user-search-container'>
          <div className="label-input">
            <p>Your zip</p>
            <input onChange={handleChange} />
          </div>
          <div className="label-input">
            <p>Your health insurance provider</p>
            <select>
              {
                insuranceProviders.map((insP, index) => {
                  return <option key={index}>{insP}</option>
                })
              }
            </select>
          </div>
          <div className="label-input">
            <p>Care type your looking for</p>
            <select>
              {
                careTypes.map((careType, index) => {
                  return <option key={index}>{careType}</option>
                })
              }
            </select>
          </div>
          <div className='search-button-container'>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className='user-contribute-container'>
          <p>
            If you're visiting a healthcare provider, it's helpful to other users of "Am I Covered"
            to know what insurance the healthcare provider accepts. Click "Contribute" below if you're
            feeling generous.
          </p>
          <button>Contribute</button>
        </div>

        <GoogleMapComponent center={userLocation} />
        <DataTable />
      </div>
    </div>
  );
}

export default App;
