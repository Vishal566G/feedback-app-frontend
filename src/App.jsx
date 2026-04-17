import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  const handleSubmit = async ({ name, feedback }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, feedback }),
      });
      const newFeedback = await res.json();
      setFeedbacks((prev) => [newFeedback, ...prev]);
    } catch (err) {
      console.error("Failed to submit feedback:", err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Feedback Board</h1>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
