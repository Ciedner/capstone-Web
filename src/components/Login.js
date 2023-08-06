import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [establishmentData, setEstablishmentData] = useState(null); 
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  const handleCreate = () => {
    navigate("/Create");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, 'establishments');
      const querySnapshot = await getDocs(collectionRef);
      
      const establishment = querySnapshot.docs.find(doc => doc.data().email === email);

      if (establishment && establishment.data().password === password) {
        setEstablishmentData(establishment.data());
        alert('Login successful!');
        navigate('/Dashboard', { state: establishment.data() });
      } else {
        alert('Invalid login credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'white',
  };
  const selectStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };
  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
    textAlign: 'center',
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

  const buttonStyle2 = {
    width: '100%',
    padding: '12px',
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
  };


  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <img
          src="parking.png"
          alt="SpotWise Parking Management Logo"
          style={{ width: '200px', marginBottom: '20px', objectFit: 'cover' }}
        />
        <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={selectStyle}
          >
             <option value="">Please select type of account</option>
            <option value="agents">Agent</option>
            <option value="establishment">Establishment</option>
          </select>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Log In
          </button>
          <p style={{ marginTop: '10px', fontSize: '14px' }}>
           <a href="/forget">Forget Password?</a>
          </p>
          <button type="submit" style={buttonStyle2} onClick={handleCreate}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
