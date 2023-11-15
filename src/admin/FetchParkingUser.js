import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPage.css';

const FetchParkingUsers = () => {
  const [parkingSeeker, setParkingSeeker] = useState([]);

  useEffect(() => {
    const fetchParkingUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "user"));
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParkingSeeker(userList);
      } catch (error) {
        console.error("Error fetching parking seeker:", error);
        // Handle the error appropriately in your application
      }
    };

    fetchParkingUsers();
  }, []);

  return (
    <div className="admin-dashboard">
    <div className="sidebar">
    <div className="admin-container">
    <img 
      src="customer.jpg"
      alt="Admin"
      className="admin-pic" 
      style={{ width: '50px', marginRight: '10px' }} 
    />
    <span className="admin-text">Admin</span>
  </div>
      <p><a href='AdminPage'>Home</a></p>
      <p><a href='FetchEstablishments'>Establishment List</a></p>
      <p><a href='FetchAgents'>Agents List</a></p>
    </div>
    <div className="main-content">
      <div className="header">Good day, Mr. Berto!</div>
      <div className="project-list">
        <h1 className="pending">Parking Seekers Accounts</h1>
        {parkingSeeker.length > 0 ? (
          <ul>
            {parkingSeeker.map(parkingSeeker => (
              <li key={parkingSeeker.id} className="w3-bar">
                  <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                  <img 
                    src={parkingSeeker.profileImageUrl || '/default-avatar.png'} 
                    alt={parkingSeeker.profileImageUrl} 
                    className="w3-bar-item w3-circle" 
                    style={{ width: '85px' }} 
                  />
                <div className="w3-bar-item">
                  <span className="w3-large">{parkingSeeker.name}</span><br />
                  <span className="w3-span-sub">{parkingSeeker.address}</span><br />
                  <span className="w3-span-sub">{parkingSeeker.email}
                    </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No parking seekers found.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default FetchParkingUsers;
