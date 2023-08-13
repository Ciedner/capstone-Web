import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { Card, Row, Col, Container, Table } from "react-bootstrap";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBCardTitle
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import {db} from "../config/firebase"
import { collection , onSnapshot } from "firebase/firestore";

const Tracks = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [data, setData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  
  const [showSchedule, setShowSchedule] = useState(false);

  const handleCardHover = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleViewRevenue = () => {
    setShowTable(true);
    setShowUserDetail(false);
    setShowSchedule(false);
  };

  const handleViewUserDetail = () => {
    setShowUserDetail(true);
    setShowTable(false);
    setShowSchedule(false);
  };

  const handleViewSchedule = () => {
    setShowSchedule(true);
    setShowTable(false);
    setShowUserDetail(false);
 
  };

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

  return (
    <div style={{ backgroundColor: '#3b89ac', minHeight: "100vh" }}>
     <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851", marginBottom:'20px' }}>
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
              <Dropdown.Item href="OperatorDashboard"><img
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
      <Container style={{backgroundColor:'#bfd2d9', marginTop:'80px', borderRadius:'25px'}}>
        <Row>
          <Col md={5} style={{marginTop:'20px'}}>
            <Container>
              <Row>
                <Col md={6}>
                  <MDBCard
                    style={{ height: '350px', borderRadius:'20px'}}
                    onMouseEnter={() => handleCardHover(1)}
                    onMouseLeave={handleCardLeave}
                    className={hoveredCard === 1 ? 'hovered-card' : ''}
                  >
                    <MDBCardImage src='https://media.istockphoto.com/id/1306314288/vector/monthly-financial-report-rgb-color-icon.jpg?s=612x612&w=0&k=20&c=hFZfzotHine6telPBHeMxuONa63THVczLWQJgC4h9HQ=' style={{ objectFit: 'cover', height: '50%', borderRadius:"20px" }} />
                    <MDBCardBody style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
                      <div>
                        <MDBCardTitle style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Revenue</MDBCardTitle>
                        <MDBCardText style={{ fontFamily: 'serif' }}>
                          This section provides a concise overview of the financial gains achieved.
                        </MDBCardText>
                      </div>
                      <MDBBtn onClick={handleViewRevenue} style={{ fontFamily: 'Courier New' }}>View Revenue</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </Col>
                <Col md={6}>
                  <MDBCard
                    style={{ height: '350px',  borderRadius:'20px' }}
                    onMouseEnter={() => handleCardHover(2)}
                    onMouseLeave={handleCardLeave}
                    className={hoveredCard === 2 ? 'hovered-card' : ''}
                  >
                    <MDBCardImage src='https://png.pngitem.com/pimgs/s/80-800194_transparent-users-icon-png-flat-user-icon-png.png' style={{ objectFit: 'cover', height: '50%', borderRadius:'20px'}} />
                    <MDBCardBody style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
                      <div>
                        <MDBCardTitle style={{ fontFamily: 'Courier New', fontWeight: 'bold' }}>Customer</MDBCardTitle>
                        <MDBCardText style={{ fontFamily: 'serif' }}>
                          This sections offers a summary of the user who parked today.
                        </MDBCardText>
                      </div>
                      <MDBBtn onClick={handleViewUserDetail} style={{ fontFamily: 'Courier New' }}>View Customer Details</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px', marginBottom:'20px'}}>
                <Col md={6}>
                  <MDBCard
                    style={{ height: '350px', borderRadius:'20px' }}
                    onMouseEnter={() => handleCardHover(4)}
                    onMouseLeave={handleCardLeave}
                    className={hoveredCard === 4 ? 'hovered-card' : ''}
                  >
                    <MDBCardImage src='https://cdn-icons-png.flaticon.com/512/1497/1497835.png' position='top' alt='...' style={{ objectFit: 'cover', height: '50%', borderRadius:'20px' }} />
                    <MDBCardBody style={{ height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
                      <div>
                        <MDBCardTitle style={{ fontFamily: 'Courier New' }}>Schedule</MDBCardTitle>
                        <MDBCardText style={{ fontFamily: 'serif' }}>
                          This section provides a concise overview of the financial gains achieved.
                        </MDBCardText>
                      </div>
                      <MDBBtn onClick={handleViewSchedule} style={{ fontFamily: 'Courier New' }}>View Schedule</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={6}>
            <Container style={{marginLeft:'75px',backgroundColor: '#fff', padding: '10px', marginTop: '20px', height: '700px', borderRadius:'20px'}}>
              {showTable ? (
                <>
                  <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold', textAlign: 'center', marginBottom:'15px' }}>INCOME DETAIL</h3>
                  <Table responsive style={{fontFamily:'Georgina'}}>
                    <thead>
                      <tr>
                        <th><img
                        src="num.png"
                        alt="ID Number"
                        style={{ width: '30px', marginRight: '20px'}}
                      /></th>
                        <th><img
                        src="date.jpg"
                        alt="Calendar"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="coins.png"
                        alt="Amount"
                        style={{ width: '30px', marginLeft:'20px'}}
                      /></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2023-07-01</td>
                        <td>PHP 500</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>2023-07-02</td>
                        <td>PHP 750</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : showUserDetail ? (
                <>
                  <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold', textAlign: 'center', marginBottom:'15px' }}>CUSTOMER DETAIL</h3>
                  <Table responsive style={{fontFamily:'Georgina'}}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th><img
                        src="opname.jpg"
                        alt="Name"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'40px'}}
                      />Customer Name</th>
                        <th><img
                        src="ope.jpg"
                        alt="Email"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'40px'}}
                      />Customer Email </th>
                        <th><img
                        src="timein.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="timout.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '10px', marginLeft:'20px'}}
                      /></th>
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
                </tr>
              ))}
            </tbody>
                  </Table>
                </>
             ) : showSchedule ? (
                <>
                  <h3 style={{ fontFamily: 'Courier New', fontWeight: 'bold', textAlign: 'center', marginBottom:'20px'}}>SCHEDULE DETAIL</h3>
                  <Table responsive style={{fontFamily:'Georgina'}}>
                    <thead>
                      <tr>
                        <th><img
                        src="agent.jpg"
                        alt="Agent Name"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="timein.png"
                        alt="Time in"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="timout.png"
                        alt="Time out"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="dutyH.jpg"
                        alt="Duty Hours"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'20px'}}
                      /></th>
                        <th><img
                        src="ope.jpg"
                        alt="Email"
                        style={{ width: '30px', marginRight: '20px', marginLeft:'60px'}}
                      /></th>
                        <th><img
                        src="opcontact.png"
                        alt="Contact Number"
                        style={{ width: '30px', marginLeft:'20px'}}
                      /></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Marky Rocarberte</td>
                        <td>10:00 AM</td>
                        <td>04:00 PM</td>
                        <td>6 hours</td>
                        <td>markyrocaberte@gmail.com</td>
                        <td>0920123458</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  <h3 style={{fontFamily:'Courier New', fontWeight:'bold', textAlign:'center'}}>OVERVIEW</h3>
                </>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Tracks;