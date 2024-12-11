import React, {useState} from "react";
import axios from "axios";
import './Color.css';
import './App.css';

function Color()
{
    const [selectedColor, setSelectedColor] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [afterUpdatModalOpen, setAfterUpdateModelOpen] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    //const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
    const [brightness, setBrightness] = useState(50);
    const [file_id, setFileId] = useState(''); 
    const setColor = (color) =>{
        let colorCode = '';
        switch (color) {
            case 'Indigo':
                colorCode = 'rgb(75, 0, 130)';
                break;
            case 'Blue':
                colorCode = 'rgb(0, 0, 255)';
                break;
            case 'Magenta':
                colorCode = 'rgb(255, 0, 255)';
                break;
            default:
                colorCode = '';
        }
        setSelectedColor(colorCode);
        document.documentElement.style.setProperty('--slider-thumb-color', colorCode);
        document.documentElement.style.setProperty('--slider-track-color', colorCode);
    };

    const handleSliderChange = (event) =>{
        setBrightness(event.target.value);
    }

    const handleCheckUpdate = async() => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/check-update');
            setFileId(response.data.file_id);
            setUpdateMessage(response.data.message);
            //setIsUpdateAvailable(true);
            setIsUpdateModalOpen(true);
        } catch (error) {
            console.error("Error occurred: ", error);
        }
    };

    const handleUpdateClose = () => {
        setIsUpdateModalOpen(false);
        //setIsUpdateAvailable(false);
    };

    const handleDownloadUpdate = async(file_id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/update?fileid=${file_id}`);
            setIsUpdateModalOpen(false);
            setAfterUpdateModelOpen(true);
        }
        catch(error){
            console.error("Error occurred: ", error);
        }
    }

    return(
        <div className='container'>
            {/* {isUpdateAvailable&&(<button className="update-button" onClick={checkUpdate} >Check Update</button>)} */}
            <button className="update-button" onClick={handleCheckUpdate} >Check Update</button>
            <h1>Ambient Color</h1>
            <div className='colorOptions'>
                <div id="indigo" className='colorOption' onClick={() => setColor('Indigo')}></div>
                <div id="blue" className='colorOption' onClick={() => setColor('Blue')}></div>
                <div id="magenta" className='colorOption' onClick={() => setColor('Magenta')}></div>
            </div>

            <div className='sliderContainer'>
                <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={brightness} 
                    className='slider' 
                    onChange={handleSliderChange} 
                />
            </div>
            {/* Update Modal */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleUpdateClose}>&times;</span>
                        <h3>Update Status</h3>
                        <p>{updateMessage}</p>
                        {updateMessage.includes('Update available') && (
                            <button className="App-button" onClick={()=>handleDownloadUpdate(file_id)}>Download</button>
                        )}
                    </div>
                </div>
            )}
            {/* After Update Modal */}
            {afterUpdatModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleUpdateClose}>&times;</span>
                        <h3>Software Updated</h3>
                        <button className="App-button" onClick={()=>window.location.reload()}>Restart</button>
                    </div>
                </div>
            )}
        </div>      
    );
}

export default Color;