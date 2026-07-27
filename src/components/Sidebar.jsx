import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);

    if (!auth.user) {
        return null;
    }

    const isActive = (path) => location.pathname === path;

    const patientNavItems = [
        {
            path: "/patient/dashboard",
            label: "Dashboard",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            path: "/patient/doctor-search",
            label: "Find Doctors",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            path: "/patient/my-appointments",
            label: "Appointments",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            path: "/patient/medical-history",
            label: "Medical Records",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            path: "/patient/billing",
            label: "Billing & Payments",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            path: "/patient/notifications",
            label: "Notifications",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            )
        },
        {
            path: "/patient/messages",
            label: "Messages",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            )
        },
        {
            path: "/patient/profile",
            label: "My Profile",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )
        },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 min-h-[calc(100vh-73px)] p-4 shrink-0 flex flex-col justify-between">

            <div>

                <div className="px-3 py-3 mb-6 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                        ✦
                    </div>

                    <div>

                        <p className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                            Patient Portal
                        </p>

                        <p className="text-xs text-slate-400">
                            Secure Access v2.4
                        </p>

                    </div>

                </div>

                <nav className="space-y-1">

                    {patientNavItems.map((item) => {

                        const active = isActive(item.path);

                        return (

                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition duration-200 ${
                                    active
                                        ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25 font-semibold"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                                }`}
                            >

                                <span className={active ? "text-white" : "text-slate-400"}>
                                    {item.icon}
                                </span>

                                <span>{item.label}</span>

                            </Link>

                        );
                    })}

                </nav>

            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 px-3">

                <div className="flex items-center gap-3">

                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>

                    <span className="text-xs font-medium text-slate-400">
                        System Operational
                    </span>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;
