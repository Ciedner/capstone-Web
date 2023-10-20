import React, {useContext, useState, useEffect}from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faChartColumn, faAddressCard, faPlus, faCar, faUser, faCoins, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserContext';
import {auth, db} from "../config/firebase"

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  backgroundColor: "#bfd2d9",
};

const listItemHoverStyle = {
  backgroundColor: "#bfd2d9",
};

const Establishment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [name, setName] = useState(user.managementName || ""); 
  const [address, setAddress] = useState(user.address || ""); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in
        if (auth.currentUser) {
          const userId = auth.currentUser.uid;

          // Fetch user data from Firestore
          const doc = await db.collection("establishments").doc(userId).get();

          if (doc.exists) {
            const userData = doc.data();
            
            setName(userData.managementName || "");
            setAddress(userData.address || "");
          } else {
            console.log("No user data found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []); 
  const establishmentData = location.state; 

  const handleButtonClick = () => {
    navigate("/TicketInfo");
  };

  const handleViewProfile = () => {
    navigate("/Profiles");
  };
  const handleAgentSchedule = () => {
    navigate("/AgentSchedule");
  };

  const handleRevenues = () => {
    navigate("/Tracks");
  };

  const handleRegister = () => {
    navigate("/AgentRegistration");
  };

  const handleFeed = () => {
    navigate("/Feedback");
  };

  const handleProfile = () => {
    navigate("/Profiles");
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

  return (
    <section style={{ backgroundColor: '#3b89ac', minHeight: '100vh' }}>
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
                <Dropdown.Item href="/"><img
                        src="logout.png"
                        alt="Operator Logout Logo"
                        style={{ width: '20px', marginRight: '10px'}}
                      />Logout</Dropdown.Item>
              </DropdownButton>
          </p>
        </div>
      </nav>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
          <MDBCard className="mb-4" style={{marginTop: '45px'}}>
              <MDBCardBody className="text-center" style={{backgroundColor:"#bfd2d9"}}>
                <p style={{fontFamily:"Georgina"}}>Administrator</p>
                <MDBCardImage
                  src="agent.jpg"
                  alt="Operator Profile Logo"
                  className="rounded-circle"
                  style={{ width: '70px', backgroundColor:"#003851"}}
                  fluid
                />
               <p className="text-muted mb-1" style={{ fontFamily: 'Georgina', marginTop: '15px' }}>
                  {name}
                </p>
                <p className="text-muted mb-4" style={{ fontFamily: 'Georgina' }}>
                  {address}
                </p>
                <Button onClick={handleProfile} style={{fontFamily:'Georgina'}}>View Profile</Button>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0" style={{backgroundColor:"#bfd2d9", marginTop: '40px'}}>
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                     <MDBCardText onClick={() => handleAgentSchedule()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                    <img
                        src="calendar.webp"
                        alt="Calendar"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                    Agent Schedule</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                     <MDBCardText onClick={() => handleRegister()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                    <img
                        src="registerA.jpg"
                        alt="User"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                   Register Ticket Operator</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem  style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                  <MDBCardText onClick={() => handleButtonClick()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                   <img
                        src="infoPark.png"
                        alt="User"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                   Ticketing Information</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <MDBCardText onClick={() => handleViewProfile()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                        <img
                        src="pofile.jpg"
                        alt="Profile"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                  View Profile</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <MDBCardText onClick={() => handleRevenues()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                        <img
                        src="management.jpg"
                        alt="Management"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                  Management Details</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <MDBCardText onClick={() => handleFeed()} style={{fontFamily:'Georgina', fontSize:'18px'}}>
                    <img
                        src="feedback.jpg"
                        alt="Feedback"
                        style={{ width: '40px', marginRight: '30px'}}
                      /> 
                    Feedback</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol> 
          <MDBCol lg="8">
            <p style={{fontFamily:'Courier New', textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>Today's Information</p>
          <div className="row mt-3 ">
        <div className="col-md-3">
          <Card> 
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}> <FontAwesomeIcon icon={faCar} color="green"/> Parking Availability</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}> {establishmentData && establishmentData.numberOfParkingLots}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faCoins} color="red"/> Total Revenues</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>0</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faUser} color="blue" /> Total Users today</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>0</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card>
            <Card.Body>
              <Card.Title style={{fontFamily:'Courier New', textAlign:'center'}}><FontAwesomeIcon icon={faFileInvoiceDollar} color="orange"/> Parking Payment</Card.Title>
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>{establishmentData && establishmentData.parkingPay}</Card.Text>
            </Card.Body>
          </Card>
        </div>  
      </div>
            <MDBCard style={{marginTop:"50px", backgroundColor:"#bfd2d9", }}>
              <MDBCardBody>
              <MDBCardText className="mb-4"  style={{fontFamily:"Courier New"}}> <FontAwesomeIcon icon={faUser} /> <span className="text-primary font-italic me-1"> Recent Parking User</span></MDBCardText>
                <MDBRow>
                <MDBCol md="4">
                    <MDBCard style={{backgroundColor:"#bfd2d9"}}>
                      <img
                        src="https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2023/06/931/523/Musk.jpg?ve=1&tl=1"
                        className="img-fluid"
                        alt="img"
                      />
                      <MDBCardBody style={{fontFamily:"Courier New", fontSize:"12px"}}>    
                        <MDBCardText>Name: Elon Musk </MDBCardText>
                        <MDBCardText>Vehicle: Tesla</MDBCardText>
                        <MDBCardText>Vehicle Plate: DEF - T3F</MDBCardText>
                        <MDBCardText>Time in: 10:10 AM </MDBCardText>
                        <MDBCardText>Time out: 3:00 PM</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard style={{backgroundColor:"#bfd2d9"}}>
                      <img
                        src="https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2021/07/dustin-poirier-conor-mcgregor-ufc-264-getty-5.jpg?w=1000&h=600&crop=1"
                        className="img-fluid"
                        alt="img"
                      />
                       <MDBCardBody style={{fontFamily:"Courier New", fontSize:"12px"}}>    
                        <MDBCardText>Name: Conor McGregor </MDBCardText>
                        <MDBCardText>Vehicle: Bugatti</MDBCardText>
                        <MDBCardText>Vehicle Plate: GHI - X6B</MDBCardText>
                        <MDBCardText>Time in: 8:45 AM </MDBCardText>
                        <MDBCardText>Time out: 11:00 AM</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4">
                    <MDBCard style={{backgroundColor:"#bfd2d9"}}>
                      <img
                        src="https://www.toolshero.com/wp-content/uploads/2020/12/mark-zuckerberg-toolshero.jpg"
                        className="img-fluid"
                        alt="img"
                      />
                      <MDBCardBody style={{fontFamily:"Courier New", fontSize:"12px"}}>    
                        <MDBCardText>Name: Mark Zuckerberg </MDBCardText>
                        <MDBCardText>Vehicle: BMW 600</MDBCardText>
                        <MDBCardText>Vehicle Plate: ABC - U2F</MDBCardText>
                        <MDBCardText>Time in: 9:00 AM </MDBCardText>
                        <MDBCardText>Time out: 1:00 PM</MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Establishment;