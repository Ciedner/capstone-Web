import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

function Create() {
  const [managementName, setManagementName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numberOfParkingLots, setNumberOfParkingLots] = useState('');
  const [contact, setContact] = useState('');

  const collectionRef = collection(db, 'establishment');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting form data:", {
        email,
        address,
        contact,
        password,
        numberOfParkingLots,
        managementName,
      });
  
      await addDoc(collectionRef, {
        email,
        address,
        contact,
        password,
        numberOfParkingLots,
        managementName,
      });
  
      console.log('Document successfully written!');
      setManagementName('');
      setAddress('');
      setEmail('');
      setPassword('');
      setNumberOfParkingLots('');
      setContact('');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleParkingTypeChange = (e) => {
    setNumberOfParkingLots(e.target.value);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
    marginTop: '50px',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
    marginRight: '30px',
    marginTop: '10px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <div style={logoStyle}>SpotWise</div>
      </div>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: 'center' }}>Create a New Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Management Name"
              value={managementName}
              onChange={(e) => setManagementName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label htmlFor="numberOfParkingLots">Number of Parking Lots Available</label>
            <input
              type="number"
              id="numberOfParkingLots"
              value={numberOfParkingLots}
              onChange={handleParkingTypeChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <input
              type='text'
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;