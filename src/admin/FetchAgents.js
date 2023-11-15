import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPage.css';

const FetchAgents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "agents"));
        const agentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgents(agentsList);
      } catch (error) {
        console.error("Error fetching parking seeker:", error);
        // Handle the error appropriately in your application
      }
    };

    fetchAgents();
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
      <p><a href='FetchParkingUsers'>Parking Seeker List</a></p>
    </div>
    <div className="main-content">
      <div className="header">Good day, Mr. Berto!</div>
      <div className="project-list">
        <h1 className="pending">Agents Account</h1>
        {agents.length > 0 ? (
          <ul>
            {agents.map(agents => (
              <li key={agents.id} className="w3-bar">
                  <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                  <img 
                    src={agents.profileImageUrl || '/default-avatar.png'} 
                    alt={agents.profileImageUrl} 
                    className="w3-bar-item w3-circle" 
                    style={{ width: '85px' }} 
                  />
                <div className="w3-bar-item">
                  <span className="w3-large">{agents.firstName} {agents.lastName}</span><br />
                  <span className="w3-span-sub">{agents.address}</span><br />
                  <span className="w3-span-sub">{agents.email}</span><br />
                  <span className="w3-span-sub">{agents.managementName}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No agents found.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default FetchAgents;
