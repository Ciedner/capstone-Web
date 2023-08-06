import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Form, Button, Modal, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleEventFormSubmit = () => {
    console.log('Event Data:', eventData);

    setEventSubmitted(true);


    setShowEventForm(false);
  };

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 === 0 ? '12' : (parsedHours % 12).toString();
    return `${formattedHours}:${minutes} ${period}`;
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
                <Dropdown.Item href="Dashboard">Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </DropdownButton>
              </p>
        </div>
      </nav>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={6} className="text-center">
          <Calendar value={selectedDate} onChange={handleDateChange} />
        </Col>
        <Col xs={12} md={6}>
          {eventSubmitted && (
            <Card className="mt-4">
              <Card.Body style={{backgroundColor:'#ADD8E6', textAlign:'center'}}>
              <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851", marginBottom:'20px'}}>
                    <div className="container">
                    <a className="navbar-brand" href="">Schedule Details</a>
                    </div>
                </nav>
                <p>Date: {selectedDate.toDateString()}</p>
                <p>Email: {eventData.email}</p>
                <p>Time In: {convertToAMPM(eventData.timeIn)}</p>
                <p>Time Out: {convertToAMPM(eventData.timeOut)}</p>
                <p>Name: {eventData.name}</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Modal show={showEventForm} onHide={() => setShowEventForm(false)}>
        <Modal.Header closeButton>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851", marginBottom:'20px'}}>
                    <div className="container">
                    <a className="navbar-brand" href="">Agent Schedule</a>
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
  );
};

export default App;