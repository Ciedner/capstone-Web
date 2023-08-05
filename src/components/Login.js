import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInformation, setUserInformation] = useState(null); // State to hold user information

  const handleLogin = () => {
    navigate('/Dashboard');
  };
 
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const establishmentRef = db.collection('establishment');
      const establishmentDoc = await establishmentRef.doc(user.uid).get();

      if (!establishmentDoc.exists) {
        alert('Establishment not found.');
        return;
      }

      // Set user information in state
      setUserInformation(establishmentDoc.data());

      console.log('Logged in successfully!');
      navigate('/Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  const handleCreateAccount = () => {
    navigate('/Create');
  };
 
  const containerStyle = {
    width: '400px',
    margin: '0 auto',
    marginTop: '100px',
    backgroundColor: '#f0f2f5',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  };

  const inputGroupStyle = {
    marginBottom: '15px',
    marginRight: '30px',
    marginTop: '10px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    marginTop: '10px'
  };

  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const head = {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: 'black', 
  };
  const para = {
    textAlign: 'center',
    fontSize: '16px',
    marginBottom: '20px',
    color: '#1877f2', 
  };
  const create = {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#008000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div className="App">
      <div style={navbarStyle}>
        <div style={logoStyle}>SpotWise</div>
      </div>
      <div style={containerStyle}>
        <h2 style={head}>Log in</h2>
        <form>
            <div style={inputGroupStyle}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                placeholder='Email'
              />
            </div>
            <div style={inputGroupStyle}>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
                placeholder='Password'
              />
            </div>
            <button type="submit" style={buttonStyle} onClick={handleSubmit}>Log In</button>
            <h3 style={para}>Forgot Password</h3>
            <button type="button" style={create} onClick={handleCreateAccount}>
                Create Account
            </button>
          </form>
        </div>
      </div>
  );
}

export default Login;