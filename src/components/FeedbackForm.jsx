import { useState } from "react";

function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s\-]+$/.test(name)) {
      newErrors.name = "Name contains invalid characters.";
    }
    if (!feedback.trim()) {
      newErrors.feedback = "Feedback is required.";
    } else if (feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    await onSubmit({ name, feedback });
    setLoading(false);
    setName("");
    setFeedback("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-lg">
      {/* Success Toast */}
      <div
        className={`mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium transition-all duration-500 ${submitted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        {/* Checkmark icon */}
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Feedback submitted successfully!
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          relative overflow-hidden
          bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl p-8
          shadow-xl shadow-black/5 dark:shadow-black/40
        "
      >
        {/* Subtle top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.75 bg-linear-to-r from-violet-500 via-blue-500 to-cyan-500 rounded-t-2xl" />

        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
          Share your thoughts
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7">
          Your feedback helps us improve every day.
        </p>

        {/* Name Field */}
        <div className="mb-5">
          <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="e.g. Vishal Kumar"
            className={`
              w-full rounded-xl px-4 py-3 text-sm
              bg-zinc-50 dark:bg-zinc-800
              text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              border transition-all duration-200 outline-none
              ${errors.name
                ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-400/20"
                : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
              }
            `}
          />
          {errors.name && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Feedback Field */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              Feedback
            </label>
            <span className={`text-xs tabular-nums transition-colors ${feedback.length < 10 ? "text-zinc-400 dark:text-zinc-600" : "text-emerald-500"}`}>
              {feedback.length} chars
            </span>
          </div>
          <textarea
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (errors.feedback) setErrors((prev) => ({ ...prev, feedback: "" }));
            }}
            placeholder="What's on your mind? Be as detailed as you'd like..."
            rows={4}
            className={`
              w-full rounded-xl px-4 py-3 text-sm resize-none
              bg-zinc-50 dark:bg-zinc-800
              text-zinc-900 dark:text-zinc-100
              placeholder:text-zinc-400 dark:placeholder:text-zinc-600
              border transition-all duration-200 outline-none
              ${errors.feedback
                ? "border-red-400 dark:border-red-500 focus:ring-2 focus:ring-red-400/20"
                : "border-zinc-200 dark:border-zinc-700 focus:border-violet-500 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20"
              }
            `}
          />
          {errors.feedback && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.feedback}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-3 rounded-xl text-sm font-semibold
            bg-zinc-900 dark:bg-zinc-100
            text-white dark:text-zinc-900
            hover:bg-zinc-700 dark:hover:bg-zinc-300
            active:scale-[0.98]
            transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            flex items-center justify-center gap-2
          "
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Feedback
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;