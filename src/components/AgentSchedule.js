import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Form, Button, Modal, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { MDBCardText } from 'mdb-react-ui-kit';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventData, setEventData] = useState({
    email: '',
    timeIn: '',
    timeOut: '',
    name: '',
  });
  const [eventSubmitted, setEventSubmitted] = useState(false);
  const [schedules, setSchedules] = useState([]); // Array to hold schedules
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0); // Index of the current schedule

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleEventFormSubmit = () => {
    const newSchedule = {
      email: eventData.email,
      timeIn: eventData.timeIn,
      timeOut: eventData.timeOut,
      name: eventData.name,
    };
    
    setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    setEventSubmitted(true);
    setShowEventForm(false);
    setEventData({
      email: '',
      timeIn: '',
      timeOut: '',
      name: '',
    });
  };

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 === 0 ? '12' : (parsedHours % 12).toString();
    return `${formattedHours}:${minutes} ${period}`;
  };

  const handlePrevSchedule = () => {
    setCurrentScheduleIndex((prevIndex) =>
      prevIndex === 0 ? schedules.length - 1 : prevIndex - 1
    );
  };
  
  const handleNextSchedule = () => {
    setCurrentScheduleIndex((prevIndex) =>
      prevIndex === schedules.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentSchedule = schedules[currentScheduleIndex];
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
    <Container style={{backgroundColor:'#385a7c', minHeight:'100vh', }}>
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
                <Dropdown.Item href="Dashboard">Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </DropdownButton>
              </p>
        </div>
      </nav>
      <div>
      <MDBCardText style={{marginTop:'50px', textAlign:'center', fontSize:'40px', fontFamily:'Georgia', color:'white'}}>
          Set Agents Schedule
        </MDBCardText>
      </div>
    <Container style={{backgroundColor:'#8ad6cc', minHeight:'60vh', borderRadius:'10px'}}>
    <Row className="mt-5">
    <Col xs={12} md={5} className="mb-4 mb-md-0">
      <div className="d-flex justify-content-center" style={{marginTop:'80px', marginLeft:'50px'}}> 
        <Calendar value={selectedDate} onChange={handleDateChange} style={{marginTop:'50px'}} />
      </div>
    </Col>
    <Col xs={12} md={7}>
  {eventSubmitted && (
    <Card className="mt-4" style={{top:'50px', right:'30px'}}>
      <Card.Body style={{ backgroundColor: 'pink', textAlign: 'center' }}>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: '#003851', marginBottom: '10px'}}
      >
        <div className="container">
          <a className="navbar-brand" href="">
            Schedule Details
          </a>
          </div>
        </nav>
        <table className="table">
        <tbody>
          <tr>
            <td>Date:</td>
            <td>{selectedDate.toDateString()}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{currentSchedule.email}</td>
          </tr>
          <tr>
            <td>Time In:</td>
            <td>{convertToAMPM(currentSchedule.timeIn)}</td>
          </tr>
          <tr>
            <td>Time Out:</td>
            <td>{convertToAMPM(currentSchedule.timeOut)}</td>
          </tr>
          <tr>
            <td>Agent Name:</td>
            <td>{currentSchedule.name}</td>
          </tr>
        </tbody>

        </table>
        {schedules.length > 1 && (
      <div className="slider-arrows d-flex justify-content-center mt-3">
        <Button variant="outline-secondary" onClick={handlePrevSchedule} style={{backgroundColor:'white', marginRight:'10px'}}>
          &lt; Prev
        </Button>
        <Button variant="outline-secondary" onClick={handleNextSchedule} style={{backgroundColor:'white'}}>
          Next &gt;
        </Button>
      </div>
    )}
      </Card.Body>
    </Card>
  )}
</Col>
      </Row>
      <Modal show={showEventForm} onHide={() => setShowEventForm(false)}>
        <Modal.Header closeButton style={{backgroundColor:'black',}}>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{marginLeft:'150px'}}>
                    <div className="container">
                    <a className="navbar-brand" href="" >Agent Schedule</a>
                    </div>
                </nav>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={eventData.email}
                onChange={(e) =>
                  setEventData({ ...eventData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="timeIn">
              <Form.Label>Time In</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter time in"
                value={eventData.timeIn}
                onChange={(e) =>
                  setEventData({ ...eventData, timeIn: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="timeOut">
              <Form.Label>Time Out</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter time out"
                value={eventData.timeOut}
                onChange={(e) =>
                  setEventData({ ...eventData, timeOut: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={eventData.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEventForm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEventFormSubmit}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
   </Container>
  );
};

export default App;