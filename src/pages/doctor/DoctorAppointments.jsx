import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dummyAppointments from "../../data/dummyAppointments.json";
import dummyPatients from "../../data/dummyPatients.json";
import dummyDoctors from "../../data/dummyDoctors.json";
import Layout from "../../components/Layout";

function DoctorAppointments() {
    const auth = useSelector((state) => state.auth);
    const reduxAppointments = useSelector((state) => state.appointment?.appointments || dummyAppointments);

    const [statusFilter, setStatusFilter] = useState("all");

    const doctorObj = dummyDoctors.find((d) => d.name === auth?.user?.name || d.userId === auth?.user?.id) || dummyDoctors[0];
    const doctorAppointments = reduxAppointments.filter((a) => a.doctorId === doctorObj.id || true);

    const filteredAppointments = doctorAppointments.filter((a) => {
        if (statusFilter === "all") return true;
        return a.status === statusFilter;
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

    return (
        <Layout>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
                    Clinical Workflow
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Doctor Consultation Queue
                </h1>
                <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed max-w-xl">
                    Review admin-confirmed patient visits, access EHR records, and communicate with patients.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex items-center gap-2 overflow-x-auto">
                {["all", "confirmed", "pending", "completed", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition shrink-0 ${
                            statusFilter === status
                                ? "bg-slate-900 text-white shadow-sm"
                                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                        {status} ({status === "all" ? doctorAppointments.length : doctorAppointments.filter(a => a.status === status).length})
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80">
                        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl mb-3">
                            📋
                        </div>
                        <h3 className="font-bold text-slate-800 text-base">No consultations match filter</h3>
                        <p className="text-xs text-slate-500 mt-1">Select another queue category above.</p>
                    </div>
                ) : (
                    filteredAppointments.map((appointment) => {
                        const patient = dummyPatients.find((p) => p.id === appointment.patientId) || {
                            name: "Patient Record",
                            age: 30,
                            gender: "Male",
                            phone: "+91 9876543210"
                        };

                        return (
                            <div
                                key={appointment.id}
                                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 hover:border-teal-300 transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-300 font-bold text-lg flex items-center justify-center shrink-0">
                                        {patient.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-extrabold text-slate-900 text-base">
                                                {patient.name}
                                            </h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusBadge(appointment.status)}`}>
                                                {appointment.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {patient.age} yrs • {patient.gender} • Phone: {patient.phone}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 font-medium">
                                            <span>📅 {appointment.date}</span>
                                            <span>🕒 {appointment.time}</span>
                                            <span className="text-teal-600 font-bold">Notes: {appointment.notes || appointment.reason || "Checkup"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-auto flex flex-wrap items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                                    <Link
                                        to="/patient/messages"
                                        className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 px-3.5 py-2 rounded-xl text-xs font-bold transition"
                                    >
                                        💬 Message Patient
                                    </Link>

                                    <Link
                                        to="/doctor/patient-records"
                                        className="bg-slate-900 hover:bg-teal-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                                    >
                                        📄 EHR Records
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </Layout>
    );
}

export default DoctorAppointments;
