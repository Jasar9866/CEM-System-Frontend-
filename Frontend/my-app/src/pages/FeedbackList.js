import React, { useEffect, useState } from 'react';
import { Paper, Button, TextField } from '@mui/material';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/feedback/getAll")
      .then(res => res.json())
      .then((result) => {
        setFeedbacks(result);
        setFilteredFeedbacks(result);
      });
  }, []);

  const handleDelete = (feedbackId) => {
    // Send a DELETE request to the server to permanently delete the feedback
    fetch(`http://localhost:8080/feedback/delete/${feedbackId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          // If the deletion is successful, update the state on the client side
          const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
          setFeedbacks(updatedFeedbacks);
          setFilteredFeedbacks(updatedFeedbacks);
          console.log(`Feedback with ID ${feedbackId} permanently deleted.`);
        } else {
          // Handle errors if needed
          console.error(`Failed to delete feedback with ID ${feedbackId}`);
        }
      })
      .catch(error => {
        console.error('Error occurred while deleting feedback:', error);
      });
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setSearchValue(searchQuery);
    filterFeedbacks(searchQuery);
  };

  const filterFeedbacks = (searchQuery) => {
    const filtered = feedbacks.filter(feedback => {
      const name = feedback.name.toLowerCase();
      return name.includes(searchQuery.toLowerCase());
    });
    setFilteredFeedbacks(filtered);
  };

  return (
    <div className='container'>
      <h1>Feedbacks</h1>
      <TextField
        label="Search by Name"
        value={searchValue}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <Paper elevation={3}>
        {filteredFeedbacks.map(feedback => {
          // Display only feedbacks that are not marked as deleted
          if (!feedback.isDeleted) {
            return (
              <Paper elevation={6} style={{ margin: "30px", padding: "15px", textAlign: "left" }} key={feedback.id}>
                Id: {feedback.id}<br />
                Name: {feedback.name}<br />
                Subject: {feedback.subject}<br />
                Message: {feedback.message}<br />
                <Button variant="contained" color="error" onClick={() => handleDelete(feedback.id)}>
                  Delete
                </Button>
              </Paper>
            );
          }
          return null;
        })}
      </Paper>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default FeedbackList;

