import { buildFeedbackPath, getFileData } from "../api/feedback";

function handler(request, response) {
  const feedbackId = request.query.feedbackId;

  const filePath = buildFeedbackPath();
  const fileData = getFileData(filePath);

  const selectedData = fileData.find((feedback) => feedback.id === feedbackId);

  response.status(200).json({
    feedback: selectedData,
  });
}

export default handler;
