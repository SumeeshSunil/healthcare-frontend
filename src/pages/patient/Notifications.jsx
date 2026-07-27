import { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Notifications() {
    const auth = useSelector((state) => state.auth);

    const initialNotifications = [
        {
            id: 1,
            title: "Appointment Confirmed",
            message: "Your consultation with Dr. Ananya Sharma has been confirmed for 2026-07-27 at 09:00 AM.",
            time: "10 mins ago",
            read: false,
            type: "appointment"
        },
        {
            id: 2,
            title: "New Prescription Uploaded",
            message: "Dr. Ananya Sharma uploaded an electronic Rx prescription for your consultation.",
            time: "2 hours ago",
            read: false,
            type: "record"
        },
        {
            id: 3,
            title: "Statement #2 Generated",
            message: "An invoice statement of ₹650 for Skin rash consultation is ready for payment.",
            time: "1 day ago",
            read: true,
            type: "billing"
        },
        {
            id: 4,
            title: "Lab Test Results Available",
            message: "Your Blood Pressure & ECG report diagnostics are now published in Medical Records.",
            time: "3 days ago",
            read: true,
            type: "record"
        }
    ];

    const [notificationsList, setNotificationsList] = useState(initialNotifications);

    const markAsRead = (id) => {
        setNotificationsList(
            notificationsList.map((n) =>
                n.id === id ? { ...n, read: true } : n
            )
        );
    };

    const clearAll = () => {
        setNotificationsList([]);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 max-w-4xl p-8 space-y-6">

                    <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">

                        <div>

                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Clinical Notifications
                            </h1>

                            <p className="text-xs text-slate-500 mt-1">
                                System alerts, appointment updates, and billing notifications.
                            </p>

                        </div>

                        {notificationsList.length > 0 && (

                            <button
                                onClick={clearAll}
                                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-4 py-2 rounded-xl transition"
                            >
                                Clear All Alerts
                            </button>

                        )}

                    </div>

                    {notificationsList.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">

                            <div className="text-4xl mb-3">🔔</div>

                            <h3 className="text-lg font-bold text-slate-800">
                                Notifications inbox empty
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                You have no unread alerts.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-3">

                            {notificationsList.map((item) => (

                                <div
                                    key={item.id}
                                    className={`p-5 rounded-3xl border transition flex justify-between items-start gap-4 ${
                                        item.read
                                            ? "bg-white border-slate-200/80 shadow-sm"
                                            : "bg-teal-50/60 border-teal-200 shadow-sm"
                                    }`}
                                >

                                    <div className="flex items-start gap-4">

                                        <div className="w-10 h-10 rounded-2xl bg-slate-900 text-teal-300 font-bold flex items-center justify-center text-base shrink-0">
                                            {item.type === "appointment" ? "📅" : item.type === "billing" ? "💳" : "📋"}
                                        </div>

                                        <div>

                                            <h3 className="text-sm font-bold text-slate-900">
                                                {item.title}
                                            </h3>

                                            <p className="text-slate-600 mt-1 text-xs leading-relaxed">
                                                {item.message}
                                            </p>

                                            <span className="text-[10px] text-slate-400 font-medium mt-2 block">
                                                {item.time}
                                            </span>

                                        </div>

                                    </div>

                                    {!item.read && (

                                        <button
                                            onClick={() => markAsRead(item.id)}
                                            className="text-xs text-teal-600 hover:underline font-bold whitespace-nowrap"
                                        >
                                            Mark as read
                                        </button>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default Notifications;
