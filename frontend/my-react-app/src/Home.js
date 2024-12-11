import React, {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './App.css';

function Home(){
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [digitalSignature, setDigitalSignature] = useState('');

    const navigate = useNavigate();
    const handleLoginOpen = () => setIsLoginModalOpen(true);
    const handleLoginClose = () => setIsLoginModalOpen(false);
    const handleLoginSubmit = async() => {       
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {username, password});
            //alert(response.data.message);
            setIsLoginModalOpen(false);
            navigate('/home');
        } 
        catch(error) {
            console.error("Error occured: ", error);
        }
    }

    const handleRegisterOpen = () => setIsRegisterModalOpen(true);
    const handleRegisterClose = () => setIsRegisterModalOpen(false);
    const handleRegisterSubmit = async() =>{
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                username,
                email,
                password,
                digitalSignature
            });
            alert(response.data.message);
            setIsRegisterModalOpen(false);
        } 
        catch (error) {
            console.error("Error occured", error);    
        }
    }

    const handleRegisterNavigate = () => navigate('/signup');

    return (
        <div className="Home">
            <header className="Home-header">
                <h1 className="Home-title">Welcome MAINI User</h1>
            </header>
            <button className="Home-button" onClick={handleLoginOpen}>Login</button>
            <button className="Home-button" onClick={handleRegisterNavigate}>Sign up</button>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleLoginClose}>&times;</span>
                        <h2>Login</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <button className="App-button" onClick={handleLoginSubmit}>Login</button>
                    </div>
                </div>
            )}

            {/* Registration Model */}
            {isRegisterModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleRegisterClose}>&times;</span>
                        <h2>Registration</h2>
                        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <input type="text" placeholder="Digital Signature" value={digitalSignature} onChange={(e)=>setDigitalSignature(e.target.value)} />
                        <button className="App-button" onClick={handleRegisterSubmit}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;