import { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import API from "./axios/axios";

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Respect OS preference on first load
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const LIMIT = 5;

  useEffect(() => {
    // Apply/remove dark class on <html>
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchFeedbacks(1, true);
  }, []);

  const fetchFeedbacks = async (pageNum, isInitial = false) => {
    setLoading(true);
    try {
      const res = await API.get(`/?page=${pageNum}&limit=${LIMIT}`);
      const newItems = res.data;
      if (isInitial) {
        setFeedbacks(newItems);
      } else {
        setFeedbacks((prev) => [...prev, ...newItems]);
      }
      if (newItems.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error("Failed to fetch:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeedbacks(nextPage);
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Top nav bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">FeedbackBoard</span>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="
              flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
              bg-zinc-100 dark:bg-zinc-800
              text-zinc-600 dark:text-zinc-400
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              transition-all duration-200
            "
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center">
        {/* Hero text */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
            We value your feedback
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Share what's on your mind — good or bad. It helps us get better.
          </p>
        </div>

        <FeedbackForm onSubmit={handleSubmit} />

        <FeedbackList feedbacks={feedbacks} />

        {/* Load more / End of list */}
        <div className="mt-6 flex flex-col items-center gap-2">
          {hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="
                px-6 py-2.5 rounded-full text-sm font-medium
                bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                text-zinc-700 dark:text-zinc-300
                hover:bg-zinc-50 dark:hover:bg-zinc-800
                hover:border-zinc-300 dark:hover:border-zinc-700
                transition-all duration-200 shadow-sm
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  View more feedback
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </>
              )}
            </button>
          )}

          {!hasMore && feedbacks.length > 0 && (
            <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-600">
              <div className="h-px w-16 bg-zinc-200 dark:bg-zinc-800" />
              You're all caught up
              <div className="h-px w-16 bg-zinc-200 dark:bg-zinc-800" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;