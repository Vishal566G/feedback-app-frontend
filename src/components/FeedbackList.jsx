function FeedbackList({ feedbacks }) {
    if (feedbacks.length === 0) {
        return (
            <p className="text-gray-400 text-sm text-center mt-4">
                No feedback yet. Be the first!
            </p>
        );
    }

    return (
        <div className="w-full max-w-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">All Feedback</h2>
            <ul className="space-y-4">
                {feedbacks.map((item) => (
                    <li key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm font-semibold text-blue-600">{item.name}</p>
                        <p className="text-gray-700 mt-1 text-sm">{item.feedback}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.createdAt).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackList;