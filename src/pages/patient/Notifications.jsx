import { useState } from "react";
import Layout from "../../components/Layout";

function Notifications() {
    const [notificationsList, setNotificationsList] = useState([
        {
            id: 1,
            title: "Appointment Reminder",
            message: "Your upcoming consultation with Dr. Arjun Menon is scheduled for tomorrow at 10:00 AM.",
            time: "2 hours ago",
            unread: true,
            type: "appointment"
        },
        {
            id: 2,
            title: "Lab Results Ready",
            message: "Your recent Blood Panel diagnostic report has been processed and uploaded by Kochi Central Lab.",
            time: "1 day ago",
            unread: true,
            type: "lab"
        },
        {
            id: 3,
            title: "Invoice Issued",
            message: "New billing invoice #INV-4091 for ₹1,500.00 is available for settlement.",
            time: "3 days ago",
            unread: false,
            type: "billing"
        }
    ]);

    const markAllRead = () => {
        setNotificationsList(notificationsList.map((n) => ({ ...n, unread: false })));
    };

    return (
        <Layout>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
                        System Feed
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Notifications & Alerts
                    </h1>
                    <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed">
                        Stay informed on consultation reminders, lab result releases, and account updates.
                    </p>
                </div>

                <button
                    onClick={markAllRead}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition border border-white/20 shrink-0"
                >
                    Mark All as Read
                </button>
            </div>

            <div className="space-y-4">
                {notificationsList.map((n) => (
                    <div
                        key={n.id}
                        className={`bg-white rounded-2xl p-5 sm:p-6 shadow-sm border transition flex items-start gap-4 ${
                            n.unread ? "border-teal-400/80 bg-teal-50/20" : "border-slate-200/80"
                        }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 ${
                            n.type === "appointment"
                                ? "bg-sky-50 text-sky-600"
                                : n.type === "lab"
                                ? "bg-teal-50 text-teal-600"
                                : "bg-rose-50 text-rose-600"
                        }`}>
                            {n.type === "appointment" ? "📅" : n.type === "lab" ? "🧪" : "💳"}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                                    {n.title}
                                </h3>
                                <span className="text-[11px] text-slate-400 font-medium shrink-0">
                                    {n.time}
                                </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1">
                                {n.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Notifications;
