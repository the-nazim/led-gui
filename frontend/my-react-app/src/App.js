import React, { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [brightness, setBrightness] = useState(100); // Default brightness set to 100%

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [digitalSignature, setDigitalSignature] = useState('');

  const handleLoginOpen = () => setIsLoginModalOpen(true);
  //const handleLoginClose = () => setIsLoginModalOpen(false);
  const handleLoginClose = async() => {
    try{
      const response = await axios.post('http://127.0.0.1:5000/login', {username, password});
      alert(response.data.message);
      setIsLoginModalOpen(false);
    }
    catch(error){
      console.error("Error logging in", error);
    }
  }
  
  const handleRegisterOpen = () => setIsRegisterModalOpen(true);
  //const handleRegisterClose = () => setIsRegisterModalOpen(false);
  const handleRegisterClose = async() =>{
    try{
      const response = await axios.post('http://127.0.0.1:5000/signup', {
        username,
        email,
        password,
        digitalSignature
      })
      alert(response.data.message)
      setIsRegisterModalOpen(false);
    }
    catch(error){
      console.error("Error during registration:", error); 
      alert("Registration failed");
    }
  }

  const handleCheckUpdates = async () => {
    //const isUpdateAvailable = Math.random() < 0.5; // Randomly simulate an update available (50% chance)
    try{
      const response = await axios.get('http://127.0.0.1:5000/update');
      setIsUpdateModalOpen(true);
      setUpdateMessage(response.data.message);
    }
    catch(error){
      console.error("Error during update: ", error);
      alert('Update Failed');
    }
    // if (isUpdateAvailable) {
    //   setUpdateMessage('Update available. Click here to download.');
    // } else {
    //   setUpdateMessage('No updates available.');
    // }
  };

  const handleUpdateClose = () => setIsUpdateModalOpen(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleBrightnessChange = (e) => {
    setBrightness(e.target.value);
  };

  const handleColorsOpen = () => {
    setIsColorModalOpen(true);
  };

  const handleColorsClose = () => {
    setIsColorModalOpen(false);
    setSelectedColor('');
    setBrightness(100); // Reset brightness when closing the modal
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">MAINI</h1>
      </header>
      <div className="footer"></div>
      <div className="button-container">
        <button className="App-button" onClick={handleRegisterOpen}>Registration</button>
        <button className="App-button" onClick={handleLoginOpen}>Login</button>
        <button className="App-button" onClick={handleCheckUpdates}>Check for Updates</button>
        <button className="App-button" onClick={handleColorsOpen}>Colors</button>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleRegisterClose}>&times;</span>
            <h2>Registration</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="text" placeholder="Digital Signature" value={digitalSignature} onChange={(e)=>setDigitalSignature(e.target.value)} />
            <button className="App-button" onClick={handleRegisterClose}>Submit</button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleLoginClose}>&times;</span>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button className="App-button" onClick={handleLoginClose}>Login</button>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleUpdateClose}>&times;</span>
            <h2>Update Status</h2>
            <p>{updateMessage}</p>
            {updateMessage.includes('Update available') && (
              <button className="App-button" onClick={() => alert('Downloading update...')}>Download</button>
            )}
          </div>
        </div>
      )}

      {/* Color Selection Modal */}
      {isColorModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleColorsClose}>&times;</span>
            <h2>Select a Color</h2>
            <div className="color-options">
              <div 
                className="color-box red" 
                onClick={() => handleColorSelect('red')}
                style={{ opacity: selectedColor === 'red' ? 1 : 0.5 }} // Highlight selected color
              />
              <div 
                className="color-box blue" 
                onClick={() => handleColorSelect('blue')}
                style={{ opacity: selectedColor === 'blue' ? 1 : 0.5 }} // Highlight selected color
              />
              <div 
                className="color-box green" 
                onClick={() => handleColorSelect('green')}
                style={{ opacity: selectedColor === 'green' ? 1 : 0.5 }} // Highlight selected color
              />
            </div>
            <h3>Brightness: {brightness}</h3>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={handleBrightnessChange} 
            />
            <button className="App-button" onClick={() => alert(`Selected Color: ${selectedColor}, Brightness: ${brightness}`)}>
              Set LED Color
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
