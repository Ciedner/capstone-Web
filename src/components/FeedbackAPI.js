// FeedbackAPI.js
const feedbackData = [
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      feedbackType: "Suggestion",
      content: "Great service, but could use more variety.",
      rating: 4,
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane@example.com",
      feedbackType: "Complaint",
      content: "Wait time was too long.",
      rating: 2,
    },
    // Add more feedback entries here...
  ];
  
  export function fetchAllFeedback() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(feedbackData);
      }, 500); // Simulating API delay
    });
  }
  
  export function fetchFeedbackById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const feedback = feedbackData.find((entry) => entry.id === id);
        if (feedback) {
          resolve(feedback);
        } else {
          reject(new Error("Feedback not found"));
        }
      }, 500); // Simulating API delay
    });
  }
  
  export function submitFeedback(newFeedback) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = feedbackData.length + 1;
        const feedbackWithId = { ...newFeedback, id: newId };
        feedbackData.push(feedbackWithId);
        resolve(newId);
      }, 500); // Simulating API delay
    });
  }
  