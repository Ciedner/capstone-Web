import React, { useState } from 'react';
import { auth, db } from '../config/firebase'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.sendPasswordResetEmail(email);

      const agentDocRef = db.collection('agents').doc(email);
      const agentDoc = await agentDocRef.get();

      const establishmentDocRef = db.collection('establishments').doc(email);
      const establishmentDoc = await establishmentDocRef.get();

      if (agentDoc.exists || establishmentDoc.exists) {
        setUserEmail(email);
      } else {
        setUserEmail('');
        setMessage('User with this email does not exist.');
      }

      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);

      if (error.code === 'auth/invalid-email') {
        setMessage('Invalid email format.');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      await user.updatePassword(newPassword);
      setMessage('Password updated successfully.');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#3b89ac',
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    width: '400px',
    marginTop: '50px',
  };
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
    marginBottom: '150px'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };
  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <div style={logoStyle}>SpotWise Parking Management</div>
      </div>
      <div style={formContainerStyle}>
      <h2 style={{textAlign:'center', marginBottom:'30px', fontSize:'20px'}}>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '10px', width: '300px', borderRadius:'15px', marginLeft:'10px'}}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop:'20px',
            marginLeft:'80px'
          }}
        >
          Reset Password
        </button>
      </form>
      {userEmail && (
        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ padding: '10px', marginBottom: '10px', width: '300px', borderRadius:'15px', marginLeft:'10px'}}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#1877f2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop:'20px',
              marginLeft:'80px'
            }}
          >
            Update Password
          </button>
        </form>
      )}
      <p style={{ marginTop: '20px', fontSize: '14px', color: 'gray' }}>
        {message}
      </p>
    </div>
    </div>
  );
}

export default ForgotPassword;
