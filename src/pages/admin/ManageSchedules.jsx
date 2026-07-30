import { useSelector, useDispatch } from "react";
import { approveAppointment, rejectAppointment } from "../../redux/slices/appointmentSlice";
import dummyDoctors from "../../data/dummyDoctors.json";
import dummyPatients from "../../data/dummyPatients.json";
import Layout from "../../components/Layout";

function ManageSchedules() {
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.appointment?.appointments || []);

    const pendingAppointments = appointments.filter((a) => a.status === "pending");

    const getSlotOccupancy = (doctorId, date, timeSlot) => {
        return appointments.filter(
            (a) => a.doctorId === doctorId && a.date === date && a.time === timeSlot && a.status !== "cancelled"
        ).length;
    };

    const handleApprove = (id) => {
        dispatch(approveAppointment(id));
        alert("Appointment confirmed and scheduled!");
    };

    const handleReject = (id) => {
        if (window.confirm("Reject and cancel this appointment request?")) {
            dispatch(rejectAppointment(id));
        }
    };

    return (
        <Layout>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
                        Admin Approval & Slot Control
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                        Approve Appointments & Facility Slots
                    </h1>
                    <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed max-w-xl">
                        Verify incoming patient requests against doctor availability limits (max 4 patients per slot).
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shrink-0 text-left md:text-right">
                    <p className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Pending Verification</p>
                    <h2 className="text-2xl font-black text-white">{pendingAppointments.length} Requests</h2>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Pending Appointment Requests for Approval
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Verify schedule capacity before confirming
                        </p>
                    </div>
                </div>

                {pendingAppointments.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-500">✓ No pending appointments awaiting approval</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingAppointments.map((app) => {
                            const patient = dummyPatients.find((p) => p.id === app.patientId) || {
                                name: "Patient Record",
                                age: 30,
                                gender: "Male",
                                phone: "+91 9876543210",
                                address: "Kerala"
                            };

                            const doctor = dummyDoctors.find((d) => d.id === app.doctorId) || {
                                name: "Attending Doctor",
                                specialization: "Clinical Specialist"
                            };

                            const occupancy = getSlotOccupancy(app.doctorId, app.date, app.time);

                            return (
                                <div
                                    key={app.id}
                                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-teal-300 transition flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-300 font-extrabold text-lg flex items-center justify-center shrink-0">
                                            {patient.name.charAt(0)}
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-extrabold text-slate-900 text-base">
                                                    {patient.name}
                                                </h3>
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                                                    Age: {patient.age} • {patient.gender}
                                                </span>
                                            </div>

                                            <p className="text-xs text-slate-600 mt-1">
                                                Doctor: <span className="font-bold text-slate-900">{doctor.name}</span> ({doctor.specialization})
                                            </p>

                                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                                                <span>📅 Date: <strong className="text-slate-800">{app.date}</strong></span>
                                                <span>🕒 Slot: <strong className="text-slate-800">{app.time}</strong></span>
                                                <span>📞 Phone: {patient.phone}</span>
                                                <span className={`font-bold px-2 py-0.5 rounded-md ${
                                                    occupancy >= 4 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-800"
                                                }`}>
                                                    Occupancy: {occupancy}/4 booked
                                                </span>
                                            </div>

                                            {app.reason && (
                                                <p className="text-xs text-slate-500 italic mt-1">
                                                    Complaint: "{app.reason}"
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                                        <button
                                            onClick={() => handleApprove(app.id)}
                                            className="flex-1 lg:flex-none bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md shadow-teal-600/20"
                                        >
                                            ✓ Approve & Confirm
                                        </button>
                                        <button
                                            onClick={() => handleReject(app.id)}
                                            className="flex-1 lg:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-4 py-2.5 rounded-xl text-xs font-bold transition"
                                        >
                                            ✕ Reject
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
                <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                    Doctor Suites & Daily Availability
                </h2>
                <div className="space-y-4">
                    {dummyDoctors.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-slate-50/60 rounded-2xl p-5 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                        >
                            <div>
                                <h3 className="font-extrabold text-slate-900 text-base">{doc.name}</h3>
                                <p className="text-xs font-bold text-teal-600 mt-0.5">{doc.specialization} • {doc.location}</p>
                                {doc.availability && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {doc.availability.map((avail, idx) => (
                                            <span key={idx} className="bg-white text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-[11px] border border-slate-200">
                                                {avail.day}: {avail.slots.join(", ")}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl shrink-0">
                                Max 4 Patients/Slot Cap Active
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default ManageSchedules;
