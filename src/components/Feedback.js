import React, { useState, useEffect } from 'react';
import { fetchAllFeedback, fetchFeedbackById } from './FeedbackAPI.js';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedFeedbackIds, setClickedFeedbackIds] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchAllFeedback()
      .then((data) => {
        setFeedbackList(data);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const handleFeedbackClick = (id) => {
    fetchFeedbackById(id)
      .then((data) => {
        setSelectedFeedback(data);
        const clickedIds = JSON.parse(localStorage.getItem('clickedFeedbackIds')) || [];
        const updatedClickedIds = [...clickedIds, id];
        localStorage.setItem('clickedFeedbackIds', JSON.stringify(updatedClickedIds));
        setClickedFeedbackIds(updatedClickedIds);
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  };

  const handleDeleteFeedback = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this feedback?');
    if (confirmed) {
      const updatedFeedbackList = feedbackList.filter((feedback) => feedback.id !== id);
      setFeedbackList(updatedFeedbackList);

      const updatedClickedIds = clickedFeedbackIds.filter((clickedId) => clickedId !== id);
      localStorage.setItem('clickedFeedbackIds', JSON.stringify(updatedClickedIds));
      setClickedFeedbackIds(updatedClickedIds);

      if (selectedFeedback && selectedFeedback.id === id) {
        setSelectedFeedback(null);
      }
    }
  };

  useEffect(() => {
    const clickedIds = JSON.parse(localStorage.getItem('clickedFeedbackIds')) || [];
    setClickedFeedbackIds(clickedIds);
  }, []);

  const totalPages = Math.ceil(feedbackList.length / itemsPerPage);
  const pageFeedbackList = feedbackList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const feedbackListItemStyle = {
    cursor: 'pointer',
    padding: '5px 0',
    borderBottom: '1px solid #ccc',
    fontFamily: 'Georgina',
    marginTop: '10px',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'black',
    color: 'white',
    width: '100%',
  };

  const logoStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'Georgina',
    marginLeft: '50px'
  };

  const styles = {
    mainContainer: {
      marginTop: '50px',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginTop: '70px'
    },
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
    feedbackContainer: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginTop: '30px',
    },
  };

  const para = {
    fontFamily: 'Georgina',
    marginTop: '10px',
  };


  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851", marginBottom: '20px' }}>
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
            <Dropdown.Item href="/Dashboard">Dashboard</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/">Logout</Dropdown.Item>
          </DropdownButton>
      </p>
    </div>
  </nav>
    <div style={styles.mainContainer}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Georgina', fontSize: '32px' }}>
        Customer Feedback
              </h1>
      <div style={{ display: 'flex' }}>
        <div style={{ ...styles.feedbackContainer, flex: 1 }}>
          <div style={navbarStyle}>
            <div style={logoStyle}> 
           FEEDBACK LIST</div>
          </div>
          <ul>
            {pageFeedbackList.map((feedback) => {
              const isClicked = clickedFeedbackIds.includes(feedback.id);
              const listItemStyle = {
                ...feedbackListItemStyle,
                backgroundColor: isClicked ? '#f0f0f0' : 'transparent', 
              };

              return (
                <li
                  key={feedback.id}
                  onClick={() => handleFeedbackClick(feedback.id)}
                  style={listItemStyle}
                >
                  {feedback.customerName}
                </li>
              );
            })}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
        <div style={{ ...styles.feedbackContainer, flex: 1, marginLeft: '20px' }}> 
          {selectedFeedback ? (
            <div>
              <div style={navbarStyle}>
                <div style={logoStyle}> FEEDBACK DETAILS </div>
              </div>
              <div style={para}>
                <p>Customer Name: {selectedFeedback.customerName}</p>
                <p>Email: {selectedFeedback.email}</p>
                <p>Feedback Type: {selectedFeedback.feedbackType}</p>
                <p>Content: {selectedFeedback.content}</p>
              </div>
            </div>
          ) : (
            <p>Select a feedback entry to view details.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default FeedbackPage;