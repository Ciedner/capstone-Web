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

function OperatorDashboard() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [idCounter, setIdCounter] = useState(1);
  const [userOccupy, setOccupants] = useState(250);
  const [totalUsers, setTotalUsers] = useState(0);
    const [fixedPrice, setFixedPrice] = useState(30);
    const [totalRevenues, setTotalRevenues] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/parking');
        if (response.ok) {
          const parkingData = await response.json();
          setData(parkingData);
          setTotalUsers(location.state.totalUsers || 0);
        } else {
          console.error('Failed to fetch parking data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const usersRef = db.collection('user');
      const query = usersRef.where('email', '==', searchInput);
      const querySnapshot = await query.get();
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data();
        setFoundUser(user);
      } else {
        setFoundUser(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setFoundUser(null);
    }
  };
  

  const handleInVehicleClick = () => {
    if (foundUser) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newRow = {
        id: idCounter,
        name: `${foundUser.fName} ${foundUser.lName}`,
        vehicle: foundUser.vehicle,
        plateNo: foundUser.plate,
        timeIn: currentTime,
        timeOut: '---',
        paymentStatus: 'Pending',
        paymentStatusColor: 'red',
      };
      setData((prevData) => [...prevData, newRow]);
      setIdCounter((prevCounter) => prevCounter + 1);
      setOccupants((prevTotal) => prevTotal - 1); 
      setTotalUsers((prevTotal) => prevTotal + 1);
      navigate("/operator", { state: { user: foundUser } })
    }
  };

  const handleOutVehicleClick = () => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newRow = {
      timeOut: currentTime,
      paymentStatus: 'Paid',
      paymentStatusColor: 'green',
    };
    if (foundUser) {
      setData((prevData) => {
        const updatedData = prevData.map((row) => {
          if (row.name === `${foundUser.fName} ${foundUser.lName}`) {
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
                <Dropdown.Item href="view">View Parking Slots</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </DropdownButton>
              </p>
        </div>
      </nav>
      <div className="container text-center" style={{ marginTop: '30px', fontFamily: 'Courier New', fontSize: '30px'}}>
        <p style={{color:'white'}}>Welcome to your Parking Management System</p>
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
              <h2 style={{fontFamily:'Courier New'}}>User Information:</h2>
              <p style={{fontFamily:'Copperplate'}}>First Name: {foundUser.name}</p>
              <p style={{fontFamily:'Copperplate'}}>Vehicle: {foundUser.car}</p>
              <p style={{fontFamily:'Copperplate'}}>Plate No: {foundUser.carPlateNumber}</p>
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
        <div style={{marginLeft:'100px', marginTop: '20px', textAlign: 'center', justifyContent: 'center',  width: '70%'}}>
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