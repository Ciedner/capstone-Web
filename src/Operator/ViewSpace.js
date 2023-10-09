import React, { useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { db } from "../config/firebase";
import { collection, getDocs, query, where} from 'firebase/firestore';
import SearchForm from './SearchForm';


const ParkingSlot = () => {
    const styles = {
        welcomeMessage: {
          position: "absolute",
          top: "10px",
          right: "10px",
          margin: "0",
          color: "#fff",
          fontFamily: "Rockwell, sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        },
        icon: {
          marginRight: "5px",
        },
      };
  const maxZones = 5;
  const initialSlotSets = [{ title: 'Zone 1', slots: Array(15).fill(false) }];
  
  const initialTotalSpaces = initialSlotSets.map(zone => zone.slots.length).reduce((total, spaces) => total + spaces, 0);

  const [slotSets, setSlotSets] = useState(initialSlotSets);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [zoneAvailableSpaces, setZoneAvailableSpaces] = useState(
    initialSlotSets.map(zone => zone.slots.length)
  );


  const searchInFirebase = async (searchInput) => {
    try {
      const collectionRef = collection(db, 'user');
      const q = query(collectionRef, where('carPlateNumber', '==', searchInput));
      const querySnapshot = await getDocs(q);

      const user = querySnapshot.docs.find(doc => doc.data().carPlateNumber === searchInput);

      if (user) {
        console.log('Found user:', user.data());
        setUserPlateNumber(user.data().carPlateNumber);
        setUserDetails(user.data());
      } else {
        console.log('User not found.');
        setUserDetails(null); // Set userDetails to null when user is not found
        setUserPlateNumber(searchInput); // Set userPlateNumber to the search input
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const rows = 5;
  const cols = 3;

  const handleNext = () => {
    if (currentSetIndex === slotSets.length - 1) {
      if (slotSets.length < maxZones) {
        setSlotSets(prevSets => [
          ...prevSets,
          { title: `Zone ${prevSets.length + 1}`, slots: Array(15).fill(false) },
        ]);
        setZoneAvailableSpaces(prevSpaces => [...prevSpaces, 15]); 
        setCurrentSetIndex(currentSetIndex + 1);
      }
    } else {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  const [showModal, setShowModal] = useState(false); 
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [showUserDetails, setShowUserDetails] = useState(false);
  
  const [selectedPlateNumber, setSelectedPlateNumber] = useState(""); 
  const handleAddToSlot = (carPlateNumber, slotIndex) => {
    setSelectedPlateNumber(carPlateNumber);
    setShowModal(false);
  
    const updatedSets = [...slotSets];
    updatedSets[currentSetIndex].slots[slotIndex] = {
      text: carPlateNumber,
      occupied: true,
      timestamp: new Date(),
      userDetails: userDetails,
    };
    setSlotSets(updatedSets);
  
    setZoneAvailableSpaces((prevSpaces) => {
      const updatedSpaces = [...prevSpaces];
      updatedSpaces[currentSetIndex]--;
      return updatedSpaces;
    });
  };
  
  
  const handleSlotClick = (index) => {
    setSelectedSlot(index);
    setShowModal(true);
    setUserDetails(slotSets[currentSetIndex].slots[index]?.userDetails || null);
  };
  

  
  const handleClose = () => {
    // Define what should happen when the modal is closed
  };
  const [userDetails, setUserDetails] = useState(null);
  const [textToAdd, setTextToAdd] = useState ("");
  const [userPlateNumber, setUserPlateNumber] = useState("");


  return (
    <div style={{ textAlign: 'center' }}>
        < nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            SpotWise Parking Management System
          </Link>
          <p style={styles.welcomeMessage}>
            <DropdownButton 
            variant="outline-light"
                alignRight
                title={<FaUserCircle style={styles.icon} />}
                id="dropdown-menu"
              >
                <Dropdown.Item href="OperatorDashboard"><img
                        src="dashboard.jpg"
                        alt="Operator Dashboard Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Records</Dropdown.Item>
                      <Dropdown.Item href="OperatorProfile">
                <img
                        src="opname.jpg"
                        alt="Operator Profile Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/"><img
                        src="logout.png"
                        alt="Operator Logout Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Logout</Dropdown.Item>
              </DropdownButton>
              </p>
        </div>
      </nav>
      <div style={{ textAlign: 'center', fontSize: '15px', marginTop:'10px', marginBottom:'15px'}}>
                    <h3>{slotSets[currentSetIndex].title}</h3>
        </div>
        <div
        style={{
          display: 'grid',
          gridTemplateRows: `auto repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '10px',
          maxWidth: '600px',
          margin: '0 auto',
          border: '5px solid black',
          padding: '25px',
          maxHeight: '500px',
          marginBottom: '20px',
        }}
      >
        {slotSets[currentSetIndex].slots.map((slot, index) => (
          <div
            key={index}
            style={{
              width: '90px',
              height: '80px',
              backgroundColor: slot.occupied ? 'red' : 'green',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              marginLeft: '35px',
            }}
            onClick={() => handleSlotClick(index)}
            >
            {slot.occupied ? (
              <div>
                <div>{slot.text}</div>
                <div>{slot.userDetails && slot.userDetails.carPlateNumber}</div>
              </div>
            ) : (
              index + 1
            )}
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Parking Slot {selectedSlot + 1}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {selectedSlot !== null && (
  <SearchForm
  onSearch={searchInFirebase}
  onSelectSlot={(carPlateNumber) => handleAddToSlot(carPlateNumber, selectedSlot)}
  selectedSlot={selectedSlot}
/>

  )}

{selectedSlot !== null && userDetails !== null && (
  <div style={{ marginTop: '10px' }}>
    <h4>User Details:</h4>
    <p>Email: {userDetails.email}</p>
    <p>Contact Number: {userDetails.contactNumber}</p>
    <p>Car Plate Number: {userDetails.carPlateNumber}</p>
    <p>Gender: {userDetails.gender}</p>
    <p>Age: {userDetails.age}</p>
    <p>Address: {userDetails.address}</p>
    {slotSets[currentSetIndex].slots[selectedSlot].timestamp && (
      <p>Timestamp: {slotSets[currentSetIndex].slots[selectedSlot].timestamp.toString()}</p>
    )}
  </div>
)}
    {userPlateNumber && userDetails === null && (
      <div style={{ marginTop: '10px' }}>
        User's Plate Number: {userPlateNumber}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    
  </Modal.Footer>
</Modal>
      <div style={{textAlign: 'center', fontFamily:'Georgina', fontSize:'15px', marginTop:'10px'}}>
          <span>  Total Parking Spaces: {initialTotalSpaces}</span>
          <br />
          <span> Available Spaces: {zoneAvailableSpaces[currentSetIndex]}</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5px', fontSize:'15px'}}>
            <div style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'green', marginRight: '10px' }}></div>
                <span>Available</span>
                     <div style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'red', marginLeft: '20px', marginRight: '10px' }}></div>
                 <span>Occupied</span>
            </div>
      <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', marginLeft:'450px', marginBottom:'5px'}}>
          <Button onClick={handlePrev} style={{ marginRight: '20px', backgroundColor: 'gray' }}>Prev</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
    </div>
    
  );
};

export default ParkingSlot;