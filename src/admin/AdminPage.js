import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, getDoc,setDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import './AdminPage.css';

function AdminPage() {
    const [pendingAccounts, setPendingAccounts] = useState([]);
    const [establishments, setEstablishments] = useState([]);
    const [summaryCardsData, setSummaryCardsData] = useState([]);
    const [parkingSeeker, setParkingSeeker] = useState([]);
    const [agent, setAgent] = useState ([]);

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

      useEffect(() => {
        const fetchAgents = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "agents"));
            const agentsList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAgent(agentsList);
          } catch (error) {
            console.error("Error fetching agents:", error);
            // Handle the error appropriately in your application
          }
        };
    
        fetchAgents();
      }, []);

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

  useEffect(() => {
    setSummaryCardsData([
        { title: 'Pending Accounts  ', value: `${pendingAccounts.length} Account Pending`, imgSrc: 'pending.png' },
        { title: 'Establishment Accounts', value: `${establishments.length} Registered`, imgSrc: 'check.png'},
        { title: 'Parking Seekers', value: `${parkingSeeker.length} Registered`, imgSrc: 'check.png'},
        { title: 'Agents Accounts', value: `${agent.length} Registered`, imgSrc: 'check.png'}
        // ... other summary cards
    ]);
}, [pendingAccounts]);

    useEffect(() => {
        const fetchPendingAccounts = async () => {
          const q = query(collection(db, "pendingEstablishments"));
          const querySnapshot = await getDocs(q);
          const accounts = [];
          querySnapshot.forEach((doc) => {
            accounts.push({ id: doc.id, ...doc.data() });
          });
          setPendingAccounts(accounts);
        };
      
        fetchPendingAccounts();
      }, []);

    const handleApprove = async (accountId) => {
        const accountRef = doc(db, "pendingEstablishments", accountId);
        const accountSnapshot = await getDoc(accountRef);
        const accountData = accountSnapshot.data();
      
        // Move to establishments
        await setDoc(doc(db, "establishments", accountId), {
          ...accountData,
          createdAt: new Date(),
          isApproved: true
        });
      
        // Delete from pendingEstablishments
        await deleteDoc(accountRef);
      
        // Update the local state to remove the approved account
        setPendingAccounts(pendingAccounts.filter(account => account.id !== accountId));
      };

      const handleDecline = async (accountId) => {
        //to be updated! No function yet
      }
      
      
    return (
        <div>
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
        <p><a href='FetchEstablishments'>Establishment List</a></p>
        <p><a href='FetchParkingUsers'>Parking Seeker List</a></p>
        <p><a href='FetchAgents'>Agents List</a></p>
      </div>
      <div className="main-content">
        <div className="header">Good day, Mr. Berto!</div>
        <div className="summary-cards">
          {summaryCardsData.map(card => (
            <div key={card.title} className="card">
            <img src={card.imgSrc} alt={card.title} className="card-image" />
            <div className="card-content">
              <div className="card-title">{card.title}</div>
              <div className="card-value">{card.value}</div>
            </div>
          </div>
          ))}
        </div>
        <div className="project-list">
          <h3 className='pending'>Pending Establishment Accounts</h3>
          {pendingAccounts.map(account => (
            <div key={account.id} className="pending-sub">
              <div className="establishment-email">{account.email}</div>
              <div className="establishment-management">{account.managementName}</div>
              <div className="establishment-contact">{account.contact}</div>
              <div className="establishment-address">{account.companyAddress}</div>
              <div className="establishment-parkingLots">{account.numberOfParkingLots}</div>
              <div><button onClick={() => handleApprove(account.id)} className="approve-button">Approve</button></div>
              <div><button onClick={() => handleDecline(account.id)} className="decline-button">Decline</button></div>
            </div>
          ))}
        </div>
      </div>
    </div>       
    </div>
    );
}

export default AdminPage;