import { useState, useContext, useEffect } from "react";

import FeedbackContext from "../context/FeedbackContext";

import Card from "./shared/Card";
import Button from "./shared/Button";

import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const { handleAdd, editFeedback, updateFeedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const [rating, setRating] = useState(10);

  useEffect(() => {
    if (editFeedback.edit === true) {
      setText(editFeedback.item.text);
      setRating(editFeedback.item.rating);
      setIsDisabled(false);
    }
  }, [editFeedback]);

  const handleTextChange = (e) => {
    if (text === "") {
      setMessage("");
    } else if (text.trim().length > 10) {
      setMessage("");
      setIsDisabled(false);
    } else {
      setMessage("text should be atleast 10 characters long");
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const feedback = {
        text,
        rating,
      };
      if (editFeedback.edit === true) {
        updateFeedback(editFeedback.item.id, feedback);
      } else {
        handleAdd(feedback);
      }

      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>What is your Feedback for our service</h2>
        <RatingSelect select={(rating) => setRating(rating)} rating={rating} />
        <div className="input-group">
          <input
            type="text"
            placeholder="enter feedback.."
            value={text}
            onChange={handleTextChange}
          />
          <Button type="submit" version="primary" isDisabled={isDisabled}>
            Submit
          </Button>
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </Card>
  );
}

export default FeedbackForm;
