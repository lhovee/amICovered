import { ReactComponent as Logo } from "./assets/logo.svg"
import './App.css';
import GoogleMapComponent from './GoogleMapComponent.js';
import { useMemo, useState } from "react";
import DataTable from './DataTable';

import healthCareProvider from './assets/healthCareProvider.json';

function App() {
  const geocoder = new window.google.maps.Geocoder();
  const [userLocation, setUserLocation] = useState({
    lat: 39.099724,
    lng: -94.578331
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedCareType, setSelectedCareType] = useState("");
  const [selectedInsuranceProvider, setSelectedInsuranceProvider] = useState("");

  const [selectedModalInsuranceProvider, setSelectedModalInsuranceProvider] = useState("");
  const [selectedModalHealthCareProvider, setSelectedModalHealthCareProvider] = useState("");


  const [userContributedData, setUserContributedData] = useState([]);

  const filteredHealthCareProviders = useMemo(() => {
    let filteredProviders;
    // if none
    if (!selectedCareType && !selectedInsuranceProvider) {
      filteredProviders = healthCareProvider;
    } else if (selectedCareType && !selectedInsuranceProvider) {
      // if care type but not insurance
      filteredProviders = healthCareProvider.filter((p) => p.careTypes.includes(selectedCareType));
    } else if (!selectedCareType && selectedInsuranceProvider) {
      // if insurance but not care type
      filteredProviders = healthCareProvider.filter((p) => p.insuranceProviders.includes(selectedInsuranceProvider));
    } else if (selectedCareType && selectedInsuranceProvider && userContributedData.length === 0) {
       // both
      filteredProviders = healthCareProvider.filter((p) => p.insuranceProviders.includes(selectedInsuranceProvider) && p.careTypes.includes(selectedCareType));
    }
   // potentially remove from here
    if (userContributedData.length > 0) {
      return filteredProviders.map((i) => {
        const iCopy = { ...i };
        userContributedData.forEach((cData) => {
          if (cData.healthCareProvider === i.providerName) {
            iCopy.insuranceProviders.push(cData.insuranceProvider);
          }
        });
        return iCopy;
      })
    }
    // to here
    return filteredProviders;
  });

  function handleUserLocationChange(e) {
    const { value } = e.target;
    if (!value || value.length !== 5) return;
    geocoder.geocode( { 'address': value }, function(results, status) {
      if (status === 'OK') {
        // lat, long
        const latLong = {
          lat: results[0].geometry.bounds?.vb?.lo,
          lng: results[0].geometry.bounds?.Ra?.lo,
        }
        setUserLocation(latLong);
      } else {
        console.log('Geocode on user location was not successful for the following reason: ' + status);
      }
    });
  }

  const careTypes = healthCareProvider.map((p) => p.careTypes).flat();
  const insuranceProviders = healthCareProvider.map((p) => p.insuranceProviders).flat();

  const ModalComponent = () => {
    function handleUserContributeSave() {
      if (selectedModalHealthCareProvider && selectedModalInsuranceProvider) {
        setUserContributedData([...userContributedData, {
          insuranceProvider: selectedModalInsuranceProvider,
          healthCareProvider: selectedModalHealthCareProvider,
        }])
      }
      setShowModal(false);
    }
    
    return showModal && <div className="modal-container-background">
      <div className="modal-container">
        <div className='user-search-container'>
          <div className="label-input">
            <label>Zip</label>
            <input />
          </div>
          <div className="label-input">
            <label>Insurance Provider</label>
            <select value={selectedModalInsuranceProvider} onChange={(e) => setSelectedModalInsuranceProvider(e.target.value)}>
              {
                insuranceProviders.map((insP, index) => {
                  return <option key={index} value={insP}>{insP}</option>
                })
              }
            </select>
          </div>
          <div className="label-input">
            <label>Healthcare Provider</label>
            <select value={selectedModalHealthCareProvider} onChange={(e) => setSelectedModalHealthCareProvider(e.target.value)}>
              {
                healthCareProvider.map((hProvider, index) => {
                  return <option key={index} value={hProvider.providerName}>{hProvider.providerName}</option>
                })
              }
            </select>
          </div>
          <button onClick={handleUserContributeSave}>Save</button>
        </div>
        </div>
    </div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {<Logo />}
      </header>
      <div className='app-content'>
        <div className='user-search-container'>
          <div className="label-input">
            <label>Zip</label>
            <input onChange={handleUserLocationChange} />
          </div>
          <div className="label-input">
            <label>Insurance Provider</label>
            <select value={selectedInsuranceProvider} onChange={(e) => setSelectedInsuranceProvider(e.target.value)}>
              {
                insuranceProviders.map((insP, index) => {
                  return <option key={index} value={insP}>{insP}</option>
                })
              }
            </select>
          </div>
          <div className="label-input">
            <label>Care Type</label>
            <select value={selectedCareType} onChange={(e) => setSelectedCareType(e.target.value)}>
              {
                careTypes.map((careType, index) => {
                  return <option key={index} value={careType}>{careType}</option>
                })
              }
            </select>
          </div>
        </div>
        <div className='user-contribute-container'>
          <p>
            If you're visiting a healthcare provider, it's helpful to other users of <span className="blue-italics">"Am I Covered" </span>
            to know what insurance the healthcare provider accepts. Click "Contribute" below if you're
            feeling generous.
          </p>
          <button id="contributeBtn" onClick={() => setShowModal(true)}>Contribute</button>
        </div>

        <GoogleMapComponent center={userLocation} careProviders={filteredHealthCareProviders} />
        <DataTable careProviders={filteredHealthCareProviders} />
        <ModalComponent />
      </div>
    </div>
  );
}

export default App;
