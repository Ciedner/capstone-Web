import React, { useState, useEffect } from 'react';
import { fetchAllFeedback, fetchFeedbackById } from './FeedbackAPI.js';

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
      marginTop:'80px',
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
    <div style={styles.mainContainer}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Georgina', fontSize: '32px' }}>
        Customer Feedback Management
      </h1>
      <div style={{ display: 'flex' }}>
        <div style={{ ...styles.feedbackContainer, flex: 1 }}>
          <div style={navbarStyle}>
            <div style={logoStyle}> FEEDBACK LIST </div>
          </div>
          <ul>
            {pageFeedbackList.map((feedback) => {
              const isClicked = clickedFeedbackIds.includes(feedback.id);
              const listItemStyle = {
                ...feedbackListItemStyle,
                backgroundColor: isClicked ? '#f0f0f0' : 'transparent', // Highlight style
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
        <div style={{ ...styles.feedbackContainer, flex: 1, marginLeft: '20px' }}> {/* Right container */}
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
  );
};

export default FeedbackPage;