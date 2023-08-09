import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Form, Button, Modal, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { MDBCardText } from 'mdb-react-ui-kit';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null); 
  const [eventData, setEventData] = useState({
    email: '',
    timeIn: '',
    timeOut: '',
    name: '',
  });
  const [eventSubmitted, setEventSubmitted] = useState(false);
  const [schedules, setSchedules] = useState([]); 

 
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  };

  const handleHover = (date) => {
    if (date) {
      setHoveredDate(date);
    } else {
      setHoveredDate(null);
    }
  };

  const handleEventFormSubmit = () => {
    const newSchedule = {
      date: selectedDate,
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


  const calendarTileContent = ({ date, view }) => {
    if (view === 'month') {
      const matchingSchedules = schedules.filter(schedule =>
        new Date(schedule.date).toDateString() === date.toDateString()
      );
  
      if (matchingSchedules.length > 0) {
        return (
          <div
            style={{
              backgroundColor: '#ffcc00',
              color: 'black',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              cursor: 'pointer', 
            }}
            onMouseEnter={() => handleHover(date)} 
            onMouseLeave={() => handleHover(null)} 
          >
            {matchingSchedules.length} Schedule(s)
          </div>
        );
      }
    }
    return null;
  };
  
  const hoveredSchedule = schedules.find(schedule =>
    hoveredDate && new Date(schedule.date).toDateString() === hoveredDate.toDateString()
  );



  return (
    <Container fluid style={{ backgroundColor: 'white', minHeight: '100vh', padding: '0' }}>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851", marginBottom:'50px' }}>
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
    <Row>
     <Col xs={12} md={7} style={{ marginTop: '30px', height: '80vh', overflow: 'hidden' }}>
        <div className="calendar-container">
          <div className="calendar-navbar" style={{textAlign:'center', marginBottom:'10px', fontFamily:'Georgina', fontSize:'24px'}}>
            CALENDAR
          </div>
          <div className="calendar-content">
            <div className="d-flex justify-content-center">
              <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                tileContent={calendarTileContent}
                style={{ marginTop: '50px' }}
                onMouseOver={({ date }) => handleHover(date)}
              />
            </div>
          </div>
        </div>
      </Col>
      <Col xs={12} md={5} style={{marginTop: '70px', }}>
        <div className="schedule-details-container">
          {hoveredSchedule && (
            <div
              className="mt-4"
              style={{
                position: 'sticky',
                top: '80px',
                backgroundColor: 'pink',
                textAlign: 'center',
                marginRight:'120px',
                zIndex: 1000,
                padding: '10px',
                borderRadius:'15px'
              }}
            >
              <h5>Schedule Details</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Date:</td>
                    <td>{hoveredDate.toDateString()}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{hoveredSchedule.email}</td>
                  </tr>
                  <tr>
                    <td>Time In:</td>
                    <td>{convertToAMPM(hoveredSchedule.timeIn)}</td>
                  </tr>
                  <tr>
                    <td>Time Out:</td>
                    <td>{convertToAMPM(hoveredSchedule.timeOut)}</td>
                  </tr>
                  <tr>
                    <td>Agent Name:</td>
                    <td>{hoveredSchedule.name}</td>
                  </tr>
                </tbody>
                </table>
              </div>
            )}
          </div>
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
  );
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

export default App;