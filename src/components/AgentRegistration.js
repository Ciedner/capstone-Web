import React, { useState } from 'react';
import { db } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [selectedRadioOption, setSelectedRadioOption] = useState('');

  const navigate = useNavigate();
  const collectionRef = collection(db, 'agents');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        selectedRadioOption,
      });

      await addDoc(collectionRef, {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        selectedRadioOption,
      });

      console.log('Document successfully written!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPhoneNumber('');
      setAddress('');
      setSelectedRadioOption('');

      alert('Successfully registered!');
      navigate.navigate()
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Error registering. Please try again.');
    }
  };

  const handleRadioChange = (e) => {
    setSelectedRadioOption(e.target.value);
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
        <div style={logoStyle}>SpotWise Parking Management System</div>
      </div>
      <div style={formContainerStyle}>
        <h4 style={{ textAlign: 'center', marginBottom: '20px'}}>Create an Agent Account</h4>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
            <label style={{marginRight: '20px'}}>
              <input
                type="radio"
                value="Male"
                checked={selectedRadioOption === 'Male'}
                onChange={handleRadioChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={selectedRadioOption === 'Female'}
                onChange={handleRadioChange}
              />
             Female
            </label>
          </div>
          <button type="submit" style={buttonStyle}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
