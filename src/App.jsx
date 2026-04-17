import { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import API from "./axios/axios";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Failed to fetch:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (feedbackData) => {
    try {
      const res = await API.post("/", feedbackData);


      if (res.data.success) {
        setFeedbacks((prev) => [res.data.data, ...prev]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Submission failed");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Feedback Board</h1>
      <FeedbackForm onSubmit={handleSubmit} />
      {loading ? <p>Loading...</p> : <FeedbackList feedbacks={feedbacks} />}
    </div>
  );
}

export default App;
