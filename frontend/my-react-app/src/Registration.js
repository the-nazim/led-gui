import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style_register.css';

function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicleSignature, setVehicleSignature] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleRegisterSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/signup', {
                firstName,
                lastName,
                email,
                password,
                vehicleSignature,
            });
            setSuccessMessage(response.data.message); // Set success message
            setTimeout(() => {
                setSuccessMessage(''); // Clear message after 3 seconds
                navigate('/'); // Redirect to the homepage
            }, 3000);
        } catch (error) {
            console.error('Error occurred: ', error);
        }
    };

    return (
        <div className="Registration" style={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2>Registration</h2>
            <form>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '300px' }}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '300px' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '300px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '300px' }}
                />
                <input
                    type="text"
                    placeholder="Vehicle Signature"
                    value={vehicleSignature}
                    onChange={(e) => setVehicleSignature(e.target.value)}
                    style={{ margin: '10px', padding: '10px', width: '300px' }}
                />
                <button
                    type="button"
                    onClick={handleRegisterSubmit}
                    style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Registration;
