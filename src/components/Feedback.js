import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', {
      name,
      email,
      feedback,
      rating,
    });
    setSubmitted(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003851" }}>
        <div className="container">
          <a className="navbar-brand" href="#">SpotWise Parking Management System</a>
        </div>
      </nav>
      <Container style={{ backgroundColor: '#bfd2d9', padding: '20px', maxWidth: '600px', marginTop: '80px', borderRadius: '15px' }}>
        {submitted ? (
          <div>
            <h2>Thank you for your feedback!</h2>
            <p>We value your input.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '10px' }}>
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="rating">Your Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="feedback">Your Feedback:</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows="4"
                cols="50"
                style={{ resize: 'none', width: '100%' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
              Submit Feedback
            </button>
          </form>
        )}
      </Container>
    </div>
  );
};

export default Feedback;
