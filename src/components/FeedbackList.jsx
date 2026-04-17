function getInitials(name) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

// Deterministic color based on name for avatar bg
const AVATAR_COLORS = [
    "bg-violet-500/20 text-violet-400",
    "bg-blue-500/20 text-blue-400",
    "bg-emerald-500/20 text-emerald-400",
    "bg-amber-500/20 text-amber-400",
    "bg-rose-500/20 text-rose-400",
    "bg-cyan-500/20 text-cyan-400",
];

function getAvatarColor(name) {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
}

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function FeedbackList({ feedbacks }) {
    if (feedbacks.length === 0) {
        return (
            <div className="w-full max-w-lg mt-10 flex flex-col items-center gap-3 py-12">
                {/* Empty state icon */}
                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <svg className="w-7 h-7 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No feedback yet</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600">Be the first to share your thoughts!</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mt-10">
            {/* Header with count */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    All Feedback
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {feedbacks.length} {feedbacks.length === 1 ? "entry" : "entries"}
                </span>
            </div>

            <div className="max-h-[520px] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
                {feedbacks.map((item, index) => (
                    <div
                        key={item._id}
                        className="
              group relative
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              hover:border-zinc-300 dark:hover:border-zinc-700
              rounded-2xl p-5
              transition-all duration-200
              hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/30
            "
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div
                                className={`
                  shrink-0 w-10 h-10 rounded-xl
                  flex items-center justify-center
                  text-xs font-bold
                  ${getAvatarColor(item.name)}
                `}
                            >
                                {getInitials(item.name)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                        {formatName(item.name)}
                                    </p>
                                    <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-600">
                                        {timeAgo(item.createdAt)}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {item.feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedbackList;