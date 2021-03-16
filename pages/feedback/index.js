import { useState } from "react";
import { buildFeedbackPath, getFileData } from "../api/feedback";

function FeedbackPage(props) {
  const [feedbackItem, setfeedbackItem] = useState();

  function loadFeedback(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setfeedbackItem(data.feedback);
      });
  }

  return (
    <>
      {feedbackItem && <li key={feedbackItem.id}>{feedbackItem.email}</li>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedbackText}{" "}
            <button onClick={loadFeedback.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = getFileData(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
