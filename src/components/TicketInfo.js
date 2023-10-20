import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Form, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaUserCircle } from 'react-icons/fa';
import { faCar, faCoins, faUser, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { db } from '../config/firebase';
import { collection, onSnapshot, Timestamp} from 'firebase/firestore';

function TicketInfo() {
  // State variables
  const [data, setData] = useState([]);
  const [userOccupy, setOccupants] = useState(60);
  const [totalRevenues, setTotalRevenues] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [fixedPrice, setFixedPrice] = useState(30);

  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  const location = useLocation();


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

  useEffect(() => {
    const parkingLogsRef = collection(db, 'parkingLogs');

    const unsubscribe = onSnapshot(parkingLogsRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setData(newData);
      setLoading(false); 
    });

    return () => {
      unsubscribe(); 
    };
  }, []);

  function formatTimestamp(timestamp) {
    if (timestamp && timestamp.seconds && timestamp.nanoseconds) {
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      return new Date(milliseconds).toLocaleString();
    } else {
      return '';
    }
  }
  useEffect(() => {
    const totalPaidRevenues = data.reduce((total, row) => {
      if (row.paymentStatus === 'Paid') {
        return total + fixedPrice;
      }
      return total;
    }, 0);
    const totalUsersToday = data.length;
    setTotalUsers(totalUsersToday);
    setTotalRevenues(totalPaidRevenues);
  }, [data]);

  return (
    <div style={{ backgroundColor: '#3b89ac', minHeight: '100vh' }}>
      <Container>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003851' }}>
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
              <Dropdown.Item href="Dashboard"><img
                        src="dashboard.jpg"
                        alt="Operator Dashboard Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Dashboard</Dropdown.Item>
              <Dropdown.Item href="AgentSchedule"><img
                        src="calendar.webp"
                        alt="Agent Schedule"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Agent Schedule </Dropdown.Item> 
              <Dropdown.Item href="AgentRegistration"><img
                        src="registerA.jpg"
                        alt="Agent Register"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Register Ticket Operator</Dropdown.Item> 
              <Dropdown.Item href="Tracks"><img
                        src="management.jpg"
                        alt="Management Details"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Management Details</Dropdown.Item>
              <Dropdown.Item href="Profiles"><img
                        src="pofile.jpg"
                        alt="Management Details"
                        style={{ width: '20px', marginRight: '10px'}}
                      />View Profile</Dropdown.Item>
              <Dropdown.Item href="OperatorDashboard"><img
                        src="feedback.jpg"
                        alt="Parking Info"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Feedback</Dropdown.Item> 
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
        <div className="row mt-3">
          <div className="col-md-3">
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
          </div>
        </div>
        <div style={{ marginLeft: '200px', marginTop: '40px', textAlign: 'center', justifyContent: 'center', width: '70%', fontFamily: 'Garamond' }}>
        {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
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
          )}
        </div>
      </Container>
    </div>
  );
}

export default TicketInfo;
