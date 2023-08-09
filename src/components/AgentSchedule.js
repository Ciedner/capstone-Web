import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Calendar() {
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState("00:00");
  const [eventEndDate, setEventEndDate] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState("00:00");
  const [eventEmail, setEventEmail] = useState("");
  const [eventAgentName, setEventAgentName] = useState("");
  const [events, setEvents] = useState([]);

  // Create state variables for form field validation
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isStartDateValid, setIsStartDateValid] = useState(true);
  const [isEndDateValid, setIsEndDateValid] = useState(true);
  // ... create similar variables for other fields

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEventSubmit = () => {
    // Perform form validation
    let isValid = true;

    if (!eventTitle) {
      setIsTitleValid(false);
      isValid = false;
    } else {
      setIsTitleValid(true);
    }

    if (!eventStartDate) {
      setIsStartDateValid(false);
      isValid = false;
    } else {
      setIsStartDateValid(true);
    }

    if (!eventEndDate || eventEndDate < eventStartDate) {
      setIsEndDateValid(false);
      isValid = false;
    } else {
      setIsEndDateValid(true);
    }

    // Add similar validation checks for other fields
    

    if (isValid) {
      const CST_OFFSET = 8 * 60; // China Standard Time offset in minutes (UTC+8)
      const PST_OFFSET = 8 * 60; // Philippine Standard Time offset in minutes (UTC+8);

      const startDateTime = new Date(
        `${eventStartDate.toISOString().split("T")[0]}T${eventStartTime}`
      );

      const endDateTime = new Date(
        `${eventEndDate.toISOString().split("T")[0]}T${eventEndTime}`
      );

      // Convert to UTC timestamps
      const startTimestamp = startDateTime.getTime() + CST_OFFSET * 60000;
      const endTimestamp = endDateTime.getTime() + CST_OFFSET * 60000;

      // Adjust to Philippine Standard Time
      startDateTime.setTime(startTimestamp + PST_OFFSET * 60000);
      endDateTime.setTime(endTimestamp + PST_OFFSET * 60000);

      const newEvent = {
        title: eventTitle,
        start: startDateTime,
        end: endDateTime,
        email: eventEmail,
        name: eventAgentName,
      };

      setEvents([...events, newEvent]);
      setEventTitle("");
      setEventStartDate(new Date());
      setEventStartTime("00:00");
      setEventEndDate(new Date());
      setEventEndTime("00:00");
      setEventEmail("");
      setEventAgentName("");
      setShowModal(false);
    }
  };

  const handleEventClick = (info) => {
    const clickedEvent = info.event;

    // Convert start and end dates to PST time zone
    const clickedEventDetails = {
      title: clickedEvent.title,
      start: clickedEvent.start.toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
      }),
      end: clickedEvent.end.toLocaleString("en-PH", {
        timeZone: "Asia/Manila",
      }),
      email: clickedEvent.extendedProps.email,
      name: clickedEvent.extendedProps.name,
    };

    // Open a modal with the clicked event details
    alert(
      `Event Details:\nTitle: ${clickedEventDetails.title}\nStart: ${clickedEventDetails.start}\nEnd: ${clickedEventDetails.end}\nEmail: ${clickedEventDetails.email}\nAgent Name: ${clickedEventDetails.name}`
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="90vh"
        events={events}
        eventClick={handleEventClick}
        timeZone="Asia/Manila"
        locale="en"
      />
      <Button onClick={handleModalOpen} style={{ marginTop: "20px", marginLeft: "100vh" }}>
        Add Event
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="eventTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                value={eventTitle}
                onChange={(e) => {
                  setEventTitle(e.target.value);
                  setIsTitleValid(true);
                }}
                isInvalid={!isTitleValid}
              />
              {!isTitleValid && <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="eventStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={eventStartDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  setEventStartDate(new Date(e.target.value));
                  setIsStartDateValid(true);
                }}
                isInvalid={!isStartDateValid}
              />
              {!isStartDateValid && <Form.Control.Feedback type="invalid">Please select a valid start date.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="eventEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={eventEndDate.toISOString().split("T")[0]}
                onChange={(e) => {
                  setEventEndDate(new Date(e.target.value));
                  setIsEndDateValid(true);
                }}
                isInvalid={!isEndDateValid}
              />
              {!isEndDateValid && <Form.Control.Feedback type="invalid">Please select a valid end date.</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group controlId="eventEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={eventEmail}
                onChange={(e) => setEventEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="eventAgentName">
              <Form.Label>Agent Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter agent name"
                value={eventAgentName}
                onChange={(e) => setEventAgentName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEventSubmit}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Calendar;