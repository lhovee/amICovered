import logo from './logo.svg';
import './App.css';
import GoogleMapComponent from './GoogleMapComponent.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className='app-content'>
        <div className='user-search-container'>
          <div className="label-input">
            <p>Your zip</p>
            <input />
          </div>
          <div className="label-input">
            <p>Your health insurance provider</p>
            <select>
              <option>blah</option>
              <option>blah two</option>
              <option>blah three</option>
            </select>
          </div>
          <div className="label-input">
            <p>Care type your looking for</p>
            <select>
              <option>Pediatrician</option>
              <option>Family Doctor</option>
              <option>Pshychiatrist</option>
            </select>
          </div>
          <div className='search-button-container'>
            <button>Search</button>
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

        <GoogleMapComponent />
      </div>
    </div>
  );
}

export default App;
