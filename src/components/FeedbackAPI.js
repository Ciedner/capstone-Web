const feedbackData = [
    {
      id: 1,
      customerName: "Junas Gutib",
      email: "junas@example.com",
      feedbackType: "Suggestion",
      content: "Wait time was too long. Need to be fixed",
    },
    {
      id: 2,
      customerName: "Jason Gilbert",
      email: "gilbert@example.com",
      feedbackType: "Complaint",
      content: "The operator was not in the mood.",
    },
    {
      id: 3,
      customerName: "Jason Patigayon",
      email: "jane@example.com",
      feedbackType: "Complaint",
      content: "Parking area is tight.",
    },
    {
      id: 4,
      customerName: "Hans Bernard",
      email: "hans@example.com",
      feedbackType: "Suggestion",
      content: "Need to have a wider parking area",
    },
    {
      id: 5,
      customerName: "James Bulfa",
      email: "james@example.com",
      feedbackType: "Complaint",
      content: "Wait time was too long.",
    },
    {
      id: 6,
      customerName: "Marky Rocaberte",
      email: "marky@example.com",
      feedbackType: "Complaint",
      content: "Wait time was too long.",
    },
    {
      id: 7,
      customerName: "Ian Alonzo",
      email: "ian@example.com",
      feedbackType: "Complaint",
      content: "Prize is not recommendable for this kind of parking space.",
    },
    {
      id: 8,
      customerName: "Maybell Cardenas ",
      email: "maybell@example.com",
      feedbackType: "Complaint",
      content: "Too tight",
    },
    {
      id: 9,
      customerName: "Daisy Ree",
      email: "ree@example.com",
      feedbackType: "Complaint",
      content: "The space is too tight",
    },
  ];
  
  export function fetchAllFeedback() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(feedbackData);
      }, 500); 
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
      }, 500);
    });
  }
  
  export function submitFeedback(newFeedback) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = feedbackData.length + 1;
        const feedbackWithId = { ...newFeedback, id: newId };
        feedbackData.push(feedbackWithId);
        resolve(newId);
      }, 500);
    });
  }
  