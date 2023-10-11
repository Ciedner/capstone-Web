import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import {db} from "../config/firebase"
import {collection, onSnapshot} from "firebase/firestore";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const App = () => {
  const [showAccountingPage, setShowAccountingPage] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [parkingLogsData, setParkingLogsData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [logsData, setLogsData] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowAccountingPage = () => {
    setShowAccountingPage(true);
    setShowCustomer(false);
    setShowSchedule(false);
  };

  const handleShowCustomer = () => {
    setShowAccountingPage(false);
    setShowCustomer(true);
    setShowSchedule(false);
  };

  const handleSchedule = () => {
    setShowAccountingPage(false);
    setShowCustomer(false);
    setShowSchedule(true);
  };

  const transactions = [
    { id: 1, date: "2023-08-13", description: "Sale", amount: 500 },
    { id: 2, date: "2023-08-14", description: "Expense", amount: -100 },
  ];


  useEffect(() => {
    const logsRef = collection(db, 'logs');

    const unsubscribe = onSnapshot(logsRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setLogsData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    const scheduleRef = collection(db, 'schedule');

    const unsubscribe = onSnapshot(scheduleRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setScheduleData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const scheduleRef = collection(db, 'parkingLogs');

    const unsubscribe = onSnapshot(scheduleRef, (snapshot) => {
      const newData = snapshot.docs.map((doc) => doc.data());
      setRevenue(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

 
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


  return (
    <div style={{ backgroundColor: "#3b89ac", minHeight: "100vh" }}>
         <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/Dashboard">
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
              <Dropdown.Item href="TicketInfo"><img
                        src="infoPark.png"
                        alt="Parking Info"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Ticket Information</Dropdown.Item> 
              <Dropdown.Item href="Feedback"><img
                        src="feedback.jpg"
                        alt="Feedback"
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
      <Container className="mt-5">
        <h2 className="mb-4" style={{fontFamily:'Georgina', textAlign:'center', color:'white'}}>Welcome to Management Details Page</h2>
        <Row className="mb-4">
          <Col xs={6} md={3}>
            <div>
              <img src="coins.png" alt="Image Placeholder" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleShowAccountingPage} style={{fontFamily:'Georgina'}}>Show Revenue</Button>
          </Col>
          <Col xs={6} md={3}>
            <div>
              <img src="customer.jpg" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleShowCustomer} style={{fontFamily:'Georgina'}}>Show Customer Details</Button>
          </Col>
          <Col xs={6} md={3}>
            <div>
              <img src="agent.jpg" style={{ maxWidth: "100%", maxHeight: "150px", marginBottom:'10px' }} />
            </div>
            <Button onClick={handleSchedule} style={{fontFamily:'Georgina'}}>Show Agent Schedule</Button>
          </Col>
        </Row>
        {showAccountingPage && (
          <div>
            <h2 style={{fontFamily:'Georgina', textAlign:'center', color:'white'}}>Revenue Details</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th><img
                        src="em.png"
                        alt="Email"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Customer Email</th>
                  <th><img
                        src="calendar.webp"
                        alt="Calendar"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Date</th>
                  <th><img
                        src="desc.png"
                        alt="Description"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Description</th>
                  <th><img
                        src="amount.png"
                        alt="Amount"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Amount</th>
                </tr>
              </thead>
              <tbody>
              {logsData.map((row) => (
                <tr key={row.id}>
                  <td>{row.email}</td>
                  <td><h5 style={{fontFamily:'Georgina', fontSize:'15px', color:'green'}}>Time in: </h5>{new Date(row.timeOut.seconds * 1000).toLocaleString()}
                  <br></br>
                  <h5 style={{fontFamily:'Georgina', fontSize:'15px', color:'red'}}>Time out: </h5>{new Date(row.timeIn.seconds * 1000).toLocaleString()}
                  </td>
                  <td>{row.name} - {row.paymentStatus}</td>
                  <td>30</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        )}

        {showCustomer && (
          <div>
            <h2  style={{fontFamily:'Georgina', textAlign:'center', color:'white'}}>Customer Details</h2>
            <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th><img
                        src="em.png"
                        alt="Email"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Customer Email</th>
                        <th><img
                        src="cars.jpg"
                        alt="cars"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Vehicle </th>
                       <th><img
                        src="plate.png"
                        alt="Plate number"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Vehicle Plate Number </th>
                        <th><img
                        src="timein.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px'}}
                      />Time in</th>
                        <th><img
                        src="timout.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'20px'}}
                      />Time out</th>
                      </tr>
                    </thead>
                    <tbody>
              {logsData.map((row) => (
                <tr key={row.id}>
                  <td>{row.email}</td>
                  <td>{row.car}</td>
                  <td>{row.carPlateNumber}</td>
                  <td>{new Date(row.timeIn.seconds * 1000).toLocaleString()}</td>
                  <td>{new Date(row.timeOut.seconds * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
                  </Table>
          </div>
        )}
        {showSchedule && (
           <div>
             <h2 style={{fontFamily:'Georgina', textAlign:'center', color:'white'}}>Agent Schedule Details</h2>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th><img
                src="agent.jpg"
                alt="Agent Name"
                style={{ width: '30px', marginRight: '20px'}}
              />Agent Name</th>
                <th><img
                src="ope.jpg"
                alt="Email"
                style={{ width: '30px', marginRight: '20px'}}
              />Email Address</th>
                <th><img
                src="timein.png"
                alt="Time in"
                style={{ width: '30px', marginRight: '20px'}}
              />Time in</th>
                <th><img
                src="timout.png"
                alt="Duty Hours"
                style={{ width: '30px', marginRight: '20px'}}
              />Time out</th>
              </tr>
            </thead>
            <tbody>
            {scheduleData.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.timeIn}</td>
                  <td>{row.timeOut}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;