import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cancelAppointment } from "../../redux/slices/appointmentSlice";

import patients from "../../data/dummyPatients.json";
import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function MyAppointments() {
    const [activeTab, setActiveTab] = useState("all");

    const auth = useSelector((state) => state.auth);
    const appointments = useSelector((state) => state.appointment.appointments);
    const dispatch = useDispatch();

    const currentUserId = auth.user ? auth.user.id : 4;

    const patientProfile = patients.find(
        (p) => p.userId === currentUserId
    ) || patients[0];

    const myAppointments = appointments.filter(
        (a) => a.patientId === patientProfile.id
    );

    const filteredAppointments = myAppointments.filter((appointment) => {
        if (activeTab === "all") return true;
        return appointment.status === activeTab;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            case "pending":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "cancelled":
                return "bg-rose-50 text-rose-700 border-rose-200";

            case "completed":
                return "bg-sky-50 text-sky-700 border-sky-200";

            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            dispatch(cancelAppointment(id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-6xl p-8 space-y-8">

                    {/* Page Header */}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">

                        <div>

                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Consultation Schedule
                            </h1>

                            <p className="text-xs text-slate-500 mt-1">
                                Manage active, completed, and pending doctor visits.
                            </p>

                        </div>

                        <Link
                            to="/patient/doctor-search"
                            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow transition"
                        >
                            + Book New Visit
                        </Link>

                    </div>

                    {/* Tabs */}

                    <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm">

                        {["all", "confirmed", "pending", "completed", "cancelled"].map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
                                    activeTab === tab
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {tab}
                            </button>

                        ))}

                    </div>

                    {/* Appointments Cards */}

                    {filteredAppointments.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">

                            <div className="text-4xl mb-3">📅</div>

                            <h3 className="text-lg font-bold text-slate-800">
                                No appointments found
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                There are no {activeTab !== "all" ? activeTab : ""} consultations listed.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {filteredAppointments.map((appointment) => {

                                const doctor = doctors.find(
                                    (d) => d.id === appointment.doctorId
                                ) || { name: "Doctor", specialization: "Specialist", location: "Clinic" };

                                return (

                                    <div
                                        key={appointment.id}
                                        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                    >

                                        <div className="flex items-start gap-4">

                                            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-300 font-extrabold text-xl flex items-center justify-center shrink-0">
                                                {doctor.name.replace(/^Dr\.?\s*/i, "").charAt(0)}
                                            </div>

                                            <div>

                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {doctor.name}
                                                </h3>

                                                <p className="text-xs font-bold text-teal-600 mt-0.5">
                                                    {doctor.specialization}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    📍 {doctor.location}
                                                </p>

                                                {appointment.reason && (
                                                    <p className="text-xs text-slate-600 mt-2 bg-slate-50 px-3 py-1.5 rounded-lg inline-block border border-slate-200">
                                                        <span className="font-semibold text-slate-800">Reason:</span> {appointment.reason}
                                                    </p>
                                                )}

                                            </div>

                                        </div>

                                        <div className="flex flex-col md:items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-100">

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${getStatusBadge(
                                                    appointment.status
                                                )}`}
                                            >
                                                {appointment.status}
                                            </span>

                                            <div className="text-xs text-slate-600 md:text-right space-y-0.5">

                                                <p className="font-bold text-slate-800">
                                                    📅 {appointment.date}
                                                </p>

                                                <p>
                                                    🕒 {appointment.time}
                                                </p>

                                            </div>

                                            {(appointment.status === "confirmed" || appointment.status === "pending") && (

                                                <button
                                                    onClick={() => handleCancel(appointment.id)}
                                                    className="text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3.5 py-1.5 rounded-xl font-bold border border-rose-200 transition"
                                                >
                                                    Cancel Appointment
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    )}

                </main>

            </div>
        </div>
    );
}

export default MyAppointments;
