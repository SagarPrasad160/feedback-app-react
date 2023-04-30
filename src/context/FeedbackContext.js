import { createContext } from "react";
import { useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This feedback is from context",
      rating: 5,
    },
  ]);

  const [editFeedback, setEditFeedback] = useState({
    item: {},
    edit: false,
  });

  const handleAdd = (newFeedback) => {
    setFeedback([newFeedback, ...feedback]);
  };

  const handleDelete = (id) => {
    setFeedback(feedback.filter((f) => f.id !== id));
  };

  const handleEdit = (item) => {
    setEditFeedback({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updatedFeedback) => {
    setFeedback(
      feedback.map((f) => {
        if (f.id === id) {
          return {
            ...f,
            ...updatedFeedback,
          };
        }
        return feedback;
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
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
