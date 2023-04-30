import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";

import { useContext, useEffect } from "react";

import FeedbackContext from "../context/FeedbackContext";

function FeedbackList() {
  const { fetchFeedbacks } = useContext(FeedbackContext);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const { feedback } = useContext(FeedbackContext);
  const renderedFeedbacks = (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem key={feedback.id} feedback={feedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  return <div>{renderedFeedbacks}</div>;
}

export default FeedbackList;
