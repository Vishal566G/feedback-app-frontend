import { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Feedback Board</h1>
      <FeedbackForm onSubmit={handleSubmit} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default App;
