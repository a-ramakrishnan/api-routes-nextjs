import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function getFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function handler(request, response) {
  if (request.method === "POST") {
    const email = request.body.email;
    const feedbackText = request.body.feedbackText;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedbackText: feedbackText,
    };

    const filePath = buildFeedbackPath();

    const data = getFileData(filePath);
    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data));

    response.status(201).json({ message: "Success", feedback: newFeedback });
  } else if (request.method === "GET") {
    const filePath = buildFeedbackPath();
    const data = getFileData(filePath);

    console.log(data);

    response.status(200).json({
      feedback: data,
    });
  } else {
    response.status(401).json({
      message: "Invalid Request",
    });
  }
}

export default handler;
