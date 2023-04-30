import Card from "./shared/Card";

import { FaTimes, FaEdit } from "react-icons/fa";

import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackItem({ feedback }) {
  const { handleDelete, handleEdit } = useContext(FeedbackContext);
  return (
    <Card reverse>
      <div className="num-display">{feedback.rating}</div>
      <button className="close" onClick={() => handleDelete(feedback.id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => handleEdit(feedback)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{feedback.text}</div>
    </Card>
  );
}

export default FeedbackItem;
