import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './AdminPage.css';

const FetchEstablishments = () => {
  const [establishments, setEstablishments] = useState([]);

  useEffect(() => {
    const fetchEstablishments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "establishments"));
        const establishmentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEstablishments(establishmentsList);
      } catch (error) {
        console.error("Error fetching establishments:", error);
        // Handle the error appropriately in your application
      }
    };

    fetchEstablishments();
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
    </div>
    <div className="main-content">
      <div className="header">Good day, Mr. Berto!</div>
      <div className="project-list">
        <h1 className="pending">Establishments Accounts</h1>
        {establishments.length > 0 ? (
          <ul>
            {establishments.map(establishment => (
              <li key={establishment.id} className="w3-bar">
                  <span className="w3-bar-item w3-button w3-white w3-xlarge w3-right"></span>
                  <img 
                    src={establishment.profileImageUrl || '/default-avatar.png'} 
                    alt={establishment.managementName} 
                    className="w3-bar-item w3-circle" 
                    style={{ width: '85px' }} 
                  />
                <div className="w3-bar-item">
                  <span className="w3-large">{establishment.managementName}</span><br />
                  <span className="w3-span-sub">{establishment.companyAddress}</span><br />
                  <span className="w3-span-sub"> Approved on: {"\t"} 
                      {establishment.createdAt?.seconds
                        ? new Date(establishment.createdAt.seconds * 1000).toLocaleDateString()
                        : 'Date not available'}
                    </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No establishments found.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default FetchEstablishments;
