import { createContext } from "react";
import { useState } from "react";

import axios from "axios";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);

  const fetchFeedbacks = async () => {
    const response = await axios.get("http://localhost:3001/feedbacks");
    setFeedback(response.data);
  };

  const [editFeedback, setEditFeedback] = useState({
    item: {},
    edit: false,
  });

  const handleAdd = async (newFeedback) => {
    const response = await axios.post(
      "http://localhost:3001/feedbacks",
      newFeedback
    );
    console.log(response.data);
    setFeedback([response.data, ...feedback]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/feedbacks/${id}`);
    setFeedback(feedback.filter((f) => f.id !== id));
  };

  const handleEdit = (item) => {
    setEditFeedback({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updatedFeedback) => {
    console.log(id, updatedFeedback);
    const response = await axios.put(
      `http://localhost:3001/feedbacks/${id}`,
      updatedFeedback
    );
    setFeedback(
      feedback.map((f) => {
        if (f.id === id) {
          return {
            ...f,
            ...response.data,
          };
        }
        return f;
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        editFeedback,
        handleDelete,
        handleAdd,
        handleEdit,
        updateFeedback,
        fetchFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
