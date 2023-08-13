import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserCircle } from 'react-icons/fa';
import { faCar, faCoins, faUser, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { db } from '../config/firebase';

function TicketInfo() {
  // State variables
  const [data, setData] = useState([]);
  const [userOccupy, setOccupants] = useState(60);
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [fixedPrice, setFixedPrice] = useState(30);


  const [searchInput, setSearchInput] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const agentData = location.state;
  const establishmentData = location.state;

  const styles = {
    welcomeMessage: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      margin: '0',
      color: '#fff',
      fontFamily: 'Rockwell, sans-serif',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    icon: {
      marginRight: '5px',
    },
  };
  const defaultData = [
    {
      id: 1,
      name: 'Gilbert Canete',
      vehicle: 'Car',
      plateNo: 'ABC123',
      timeIn: '10:00 AM',
      timeOut: '11:30 AM',
      paymentStatus: 'Paid',
      paymentStatusColor: 'green',
    },
  ];
  const tableData = data.length > 0 ? data : defaultData;



  return (
    <div style={{ backgroundColor: '#3b89ac', minHeight: '100vh' }}>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003851' }}>
          <div className="container">
            <Link className="navbar-brand" to="/">
              SpotWise Parking Management System
            </Link>
            <p style={styles.welcomeMessage}>
              <DropdownButton alignRight variant="outline-light" title={<FaUserCircle style={styles.icon} />} id="dropdown-menu">
                <Dropdown.Item href="OperatorProfile">
                  <img src="opname.jpg" alt="Operator Profile Logo" style={{ width: '20px', marginRight: '10px' }} />
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="ViewSpace">
                  <img src="slot1.jpeg" alt="Operator Parking Slot Logo" style={{ width: '20px', marginRight: '10px' }} />
                  View Parking Slots
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">
                  <img src="logout.png" alt="Operator Logout Logo" style={{ width: '20px', marginRight: '10px' }} />
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </p>
          </div>
        </nav>
        <div className="row mt-3">
          <div className="col-md-3">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontFamily: 'Courier New', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faCar} color="green" /> Parking Availability
                </Card.Title>
                <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'Copperplate', fontSize: '20px' }}>{userOccupy}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontFamily: 'Courier New', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faCoins} color="red" /> Total Revenues
                </Card.Title>
                <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'Copperplate', fontSize: '20px' }}>{totalRevenues}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontFamily: 'Courier New', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faUser} color="blue" /> Total Users today
                </Card.Title>
                <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'Copperplate', fontSize: '20px' }}>{totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <Card.Body>
                <Card.Title style={{ fontFamily: 'Courier New', textAlign: 'center' }}>
                  <FontAwesomeIcon icon={faFileInvoiceDollar} color="orange" /> Parking Payment
                </Card.Title>
                <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily: 'Copperplate', fontSize: '20px' }}>{fixedPrice}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div style={{ marginLeft: '350px', marginTop: '20px', textAlign: 'center', justifyContent: 'center', width: '70%', fontFamily: 'Garamond' }}>
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
      </Container>
    </div>
  );
}

export default TicketInfo;
