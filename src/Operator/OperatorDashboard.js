import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserCircle } from "react-icons/fa";
import { faCar, faCoins, faUser, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import {db} from "../config/firebase"
import { collection, getDocs, addDoc, updateDoc,  doc, Timestamp } from 'firebase/firestore';

function OperatorDashboard() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [idCounter, setIdCounter] = useState(1);
  const [userOccupy, setOccupants] = useState(60);
  const [totalUsers, setTotalUsers] = useState(0);
    const [fixedPrice, setFixedPrice] = useState(30);
    const [totalRevenues, setTotalRevenues] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const agentData = location.state; 
  const establishmentData = location.state; 
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


  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const collectionRef = collection(db, 'user'); 
      const querySnapshot = await getDocs(collectionRef);
      
      const user = querySnapshot.docs.find(doc => doc.data().carPlateNumber === searchInput);
  
      if (user) {
        console.log('Found user:', user.data());
        setFoundUser(user.data());
      } else {
        console.log('User not found.');
        setFoundUser(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setFoundUser(null);
    }
  };

  const handleInVehicleClick = async () => {
    if (foundUser) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = currentTime.toLocaleDateString();
      const newRow = {
        id: idCounter,
        name: foundUser.name,
        vehicle: foundUser.car,
        plateNo: foundUser.carPlateNumber,
        timeIn: `${formattedDate} ${formattedTime}`,
        timeOut: '---',
        paymentStatus: 'Pending',
        paymentStatusColor: 'red',
      };
  
      try {
        const parkingLogsRef = collection(db, 'parkingLogs'); 
        const newDocRef = await addDoc(parkingLogsRef, newRow);
        console.log('User added to parkingLogs collection with ID:', newDocRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
  
      setData((prevData) => [...prevData, newRow]);
      setIdCounter((prevCounter) => prevCounter + 1);
      setOccupants((prevTotal) => prevTotal - 1);
      setTotalUsers((prevTotal) => prevTotal + 1);
      navigate('/OperatorDashboard', { state: { user: foundUser } });
    }
  };

  const handleOutVehicleClick = async () => {
    if (foundUser) {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDate = currentTime.toLocaleDateString(); 
  
      const newRow = {
        timeOut: `${formattedDate} ${formattedTime}`,
        paymentStatus: 'Paid',
        paymentStatusColor: 'green',
      };
  
      try {
        const parkingLogsRef = collection(db, 'parkingLogs'); 
        const querySnapshot = await getDocs(parkingLogsRef);
        const parkingLog = querySnapshot.docs.find((doc) => doc.data().name === foundUser.name);
  
        if (parkingLog) {
          await updateDoc(doc(parkingLogsRef, parkingLog.id), newRow);
          console.log('User data updated in parkingLogs collection:', newRow);
        }
      } catch (error) {
        console.error('Error updating document: ', error);
      }
  
      setData((prevData) => {
        const updatedData = prevData.map((row) => {
          if (row.name === foundUser.name) {
            return {
              ...row,
              ...newRow,
            };
          }
          return row;
        });
        return updatedData;
      });
  
      setFoundUser(null);
      setOccupants((prevTotal) => prevTotal + 1);
      setTotalRevenues((prevTotal) => prevTotal + fixedPrice);
    }
  };
  



  return (
    <div style={{ backgroundColor: '#3b89ac', minHeight: "100vh"}}>
    <Container>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            SpotWise Parking Management System
            </Link>
            <p style={styles.welcomeMessage}>
            <DropdownButton 
                alignRight
                variant="outline-light"
                title={<FaUserCircle style={styles.icon} />}
                id="dropdown-menu"
              >
                <Dropdown.Item href="OperatorProfile">
                <img
                        src="opname.jpg"
                        alt="Operator Profile Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Profile</Dropdown.Item>
                <Dropdown.Item href="ViewSpace"><img
                        src="slot1.jpeg"
                        alt="Operator Parking Slot Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Dashboard</Dropdown.Item>
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
      <div className="container text-center" style={{ marginTop: '30px', fontFamily: 'Courier New', fontSize: '30px'}}>
        <p style={{color:'white'}}>Welcome {agentData && agentData.firstName}  </p>
      </div>
      <div className="row mt-3 ">
        <div className="col-md-3">
          <Card> 
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}> <FontAwesomeIcon icon={faCar} color="green"/> Parking Availability</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>{userOccupy}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faCoins} color="red"/> Total Revenues</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>{totalRevenues}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faUser} color="blue" /> Total Users today</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>{totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faFileInvoiceDollar} color="orange"/> Parking Payment</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>{fixedPrice}</Card.Text>
            </Card.Body>
          </Card>
        </div>  
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px', marginTop: '20px'  }}>
          <Form onSubmit={handleSearchSubmit}>
            <Form.Control type="text" placeholder="Search .." value={searchInput} onChange={handleSearchInputChange} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="button" style={{ marginRight: '20px', backgroundColor: '#86FF33', fontFamily:'Garamond'}} type="submit">
                Search
              </button>
              <button
                className="button"
                style={{ marginRight: '20px', backgroundColor: '#FF6433', fontFamily:'Garamond'}}
                onClick={() => setSearchInput('')}
              >
                Clear
              </button>
            </div>
          </Form>
          <div style={{backgroundColor:'white', textAlign:'center', marginTop:'20px', borderRadius:'10px', height:'300px'}}>
          {foundUser && (
            <div>
              <h2 style={{ fontFamily: 'Courier New' }}>User Information:</h2>
              <p style={{ fontFamily: 'Copperplate' }}>First Name: {foundUser.name}</p>
              <p style={{ fontFamily: 'Copperplate' }}>Vehicle: {foundUser.car}</p>
              <p style={{ fontFamily: 'Copperplate' }}>Plate No: {foundUser.carPlateNumber}</p>              
           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button
                  className="button"
                  style={{ marginRight: '20px', backgroundColor: '#86FF33', fontFamily:'Garamond', marginBottom:'10px'}}
                  onClick={handleInVehicleClick}
                >
                  In Vehicle
                </button>
                <button
                  className="button"
                  style={{ marginRight: '20px', backgroundColor: '#FF6433', fontFamily:'Garamond', marginBottom:'10px' }}
                  onClick={handleOutVehicleClick}
                >
                  Vehicle Out
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
        <div style={{marginLeft:'100px', marginTop: '20px', textAlign: 'center', justifyContent: 'center',  width: '70%', fontFamily:'Garamond'}}>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Vehicle</th>
                <th>Plate No</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.vehicle}</td>
                  <td>{row.plateNo}</td>
                  <td>{row.timeIn}</td>
                  <td>{row.timeOut}</td>
                  <td style={{ color: row.paymentStatusColor }}>{row.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
      </div>
    </Container>
    </div>
  );
}

export default OperatorDashboard;