import React, { useState, useEffect, useContext } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from "../config/firebase";
import UserContext from '../UserContext';

const Reservation = () => {
  const { user } = useContext(UserContext);
  const [reservationRequests, setReservationRequests] = useState([]);
  const [historyLog, setHistoryLog] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [userNames, setUserNames] = useState({});


  const fetchReservations = async (managementName) => {
    console.log("Fetching reservations for managementName:", managementName);
    const q = query(collection(db, 'reservations'), where('managementName', '==', managementName));
    try {
      const querySnapshot = await getDocs(q);
      const reservationPromises = querySnapshot.docs.map(async (reservationDoc) => {
        const slotId = reservationDoc.data().slotId;
        const userEmail = reservationDoc.data().userEmail;
  
        // Fetch the floor name from the slotData sub-document
        const slotDocRef = doc(db, 'slot', managementName, 'slotData', `slot_${slotId}`);
        const slotDocSnapshot = await getDoc(slotDocRef);
  
        // Fetch user data
        const userQuery = query(collection(db, 'user'), where('email', '==', userEmail));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs[0]?.data();

        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [userEmail]: userData?.name || 'N/A',
        }));
  
        return {
          id: reservationDoc.id,
          name: reservationDoc.data().name,
          userName: userData?.name || 'N/A',  // Add the userName property
          plateNumber: userData?.carPlateNumber || 'N/A',
          slot: typeof slotId === 'string' ? slotId.slice(1) : 'N/A',
          slotId: slotId,
          timeOfRequest: new Date(reservationDoc.data().timestamp.seconds * 1000).toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })
        };
      });
      const reservations = await Promise.all(reservationPromises);
      console.log("Fetched reservations:", reservations);
      setReservationRequests(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser && user?.managementName) {
        console.log("User authenticated. Fetching reservations...");
        fetchReservations(user.managementName);
      } else {
        console.log("User not authenticated or managementName is null.");
        setReservationRequests([]);
      }
    });

    return () => unsubscribe();
  }, [user?.managementName]);


  useEffect(() => {
    
    localStorage.setItem('reservationRequests', JSON.stringify(reservationRequests));
  }, [reservationRequests]);

  useEffect(() => {
    
    const storedHistoryLog = JSON.parse(localStorage.getItem('historyLog'));
    if (storedHistoryLog) {
      setHistoryLog(storedHistoryLog);
    }
  }, []);
  const handleReservation = (accepted, name, plateNumber, slot, timeOfRequest, index) => {
    const status = accepted ? 'Accepted' : 'Declined';

    const logEntry = {
      status,
      name,
      plateNumber,
      slot,
      timeOfRequest,
    };

    setHistoryLog([logEntry, ...historyLog]);

    localStorage.setItem('historyLog', JSON.stringify([logEntry, ...historyLog]));

    const updatedRequests = [...reservationRequests];
    updatedRequests.splice(index, 1);
    setReservationRequests(updatedRequests);

    setSelectedReservation({
      status,
      name,
      plateNumber,
      slot,
      timeOfRequest,
    });
  };

  const HistoryLog = () => (
    <div className="history-log mt-4" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
      {historyLog.map((logEntry, index) => (
        <div className={`alert ${logEntry.status === 'Accepted' ? 'alert-success' : 'alert-danger'} mt-2`} key={index}>
          <strong>{logEntry.status}:</strong> {logEntry.name} requested a reservation on {logEntry.timeOfRequest}. Plate Number: {logEntry.plateNumber}, Slot: {logEntry.slot}
        </div>
      ))}
    </div>
  );

  const ReservationRequest = ({ request, index }) => (
    <div className="reservation-request mb-4 border p-3 rounded bg-light" key={request.plateNumber}>
      <h4 className="mb-0">Name: {request.userName}</h4>
      <p className="text-muted mb-2">Time of Request: {request.timeOfRequest}</p>
      <p>Plate Number: {request.plateNumber}</p>
      <p>Slot Number: {request.slotId}</p>
      <div className="d-flex flex-column align-items-center mt-2">
        <button className="btn btn-success" onClick={() => handleReservation(true, request.userName, request.plateNumber, request.floor, request.slot, request.timeOfRequest, index)}>Accept Reservation</button>
        <button className="btn btn-danger mt-2" onClick={() => handleReservation(false, request.userName, request.plateNumber, request.floor, request.slot, request.timeOfRequest, index)}>Decline Reservation</button>
      </div>
    </div>
  );
  

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="ViewSpace">
            SpotWise Parking Management System
          </a>
        </div>
      </nav>
      <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mb-4">Parking Reservation Management</h2>
        <div className="reservation-requests d-flex flex-column align-items-center mb-4" style={{ width: '300px', height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', background: 'white' }}>
          {reservationRequests.length === 0 ? (
            <p>No reservation</p>
          ) : (
            reservationRequests.map((request, index) => (
              <ReservationRequest request={request} index={index} key={index} />
            ))
          )}
        </div>
        <h3 className="mb-3 mt-4 text-center">Accepted/Declined Reservations</h3>
        <HistoryLog />
      </div>
    </div>
  );
};

export default Reservation;