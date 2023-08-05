import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
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
import { faEye, faChartColumn, faBars, faPlus, faCar, faUser, faCoins, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

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

const Establishment = ({ recentAddedUser }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/operator");
  };

  const handleRevenues = () => {
    navigate("/revenues");
  };

  const handleRegister = () => {
    navigate("/agentRegister");
  };

  const handleFeed = () => {
    navigate("/feed");
  };

  return (
    <section style={{ backgroundColor: '#3b89ac', minHeight: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <Link className="navbar-brand" to="/estDashBoard">
            SpotWise Parking Management System
          </Link>
        </div>
      </nav>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center" style={{backgroundColor:"#bfd2d9"}}>
                <p style={{fontFamily:"Courier New"}}>Administrator</p>
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '70px', backgroundColor:"#003851"}}
                  fluid
                />
                <p className="text-muted mb-1" style={{fontFamily:"Courier New", marginTop:'15px'}}>Marky Parking Management</p>
                <p className="text-muted mb-4" style={{fontFamily:"Courier New"}}>Talamban, Cebu</p>
                <div className="d-flex justify-content-center mb-2">
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0" style={{backgroundColor:"#bfd2d9"}}>
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <FontAwesomeIcon icon={faBars} />
                    <MDBCardText>Dashboard</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    <MDBCardText onClick={() => handleRegister()}>Register Ticket Operator</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem  style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                  <FontAwesomeIcon icon={faEye} />
                    <MDBCardText onClick={() => handleButtonClick()}>Ticketing Information</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <FontAwesomeIcon icon={faChartColumn} />
                    <MDBCardText onClick={() => handleRevenues()}>View Parking Area Tracks</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem style={listItemStyle}
                    hover
                    className="d-flex justify-content-between align-items-center p-3"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = listItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "inherit")}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <MDBCardText onClick={() => handleFeed()}>Feedback</MDBCardText>
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
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>250</Card.Text>
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
              <Card.Text style={{ textAlign: 'center', margin: '0 auto', fontFamily:'Copperplate', fontSize:'20px' }}>30</Card.Text>
            </Card.Body>
          </Card>
        </div>  
      </div>
            <MDBCard style={{marginTop:"50px", backgroundColor:"#bfd2d9"}}>
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