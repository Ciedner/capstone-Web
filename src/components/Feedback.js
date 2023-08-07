// FeedbackPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllFeedback, fetchFeedbackById } from "./FeedbackAPI.js";
import { genHoverStyle } from "antd/es/input/style/index.js";

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    fetchAllFeedback()
      .then((data) => {
        setFeedbackList(data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  }, []);

  const handleFeedbackClick = (id) => {
    fetchFeedbackById(id)
      .then((data) => {
        setSelectedFeedback(data);
      })
      .catch((error) => {
        console.error("Error fetching feedback:", error);
      });
  };

  const feedbackPageStyle = {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  };

  const flexContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const feedbackListStyle = {
    flex: "1",
    paddingRight: "20px",
    borderRight: "1px solid #ccc",
  };

  const feedbackDetailsStyle = {
    flex: "2",
    paddingLeft: "100px",
  };

  const feedbackListItemStyle = {
    cursor: "pointer",
    padding: "5px 0",
    borderBottom: "1px solid #ccc",
  };

  const feedbackListItemHoverStyle = {
    backgroundColor: "#f0f0f0",
  };

  return (
    <div style={feedbackPageStyle}>
      <h1>Customer Feedback Management</h1>
      <div style={flexContainerStyle}>
        <div style={feedbackListStyle}>
          <h2>Feedback List</h2>
          <ul>
            {feedbackList.map((feedback) => (
              <li
                key={feedback.id}
                onClick={() => handleFeedbackClick(feedback.id)}
                style={feedbackListItemStyle} 
              >
                {feedback.customerName}
              </li>
            ))}
          </ul>
        </div>
        <div style={feedbackDetailsStyle}>
          {selectedFeedback ? (
            <div>
              <h2>Feedback Details</h2>
              <p>Customer Name: {selectedFeedback.customerName}</p>
              <p>Email: {selectedFeedback.email}</p>
              <p>Feedback Type: {selectedFeedback.feedbackType}</p>
              <p>Rating: {selectedFeedback.rating}</p>
              <p>Content: {selectedFeedback.content}</p>
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
