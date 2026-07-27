import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addAppointment } from "../../redux/slices/appointmentSlice";

import patients from "../../data/dummyPatients.json";
import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function BookAppointment() {
    const auth = useSelector((state) => state.auth);
    const appointments = useSelector((state) => state.appointment.appointments);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const { doctorId } = useParams();
    const navigate = useNavigate();

    const doctor = doctors.find((d) => d.id === Number(doctorId)) || doctors[0];

    const dateObj = new Date(selectedDate);
    const dayIndex = dateObj.getDay();
    const dayName = dayNames[dayIndex];

    const available = doctor.availability?.find((a) => a.day === dayName);

    const existingAppointment = appointments.find((a) =>
        a.doctorId === doctor.id &&
        a.date === selectedDate &&
        a.time === selectedTimeSlot &&
        a.status !== "cancelled"
    );

    const handleConfirmBooking = () => {
        const patientProfile = patients.find((P) => P.userId === (auth.user ? auth.user.id : 4)) || patients[0];

        const newAppointment = {
            id: Date.now(),
            patientId: patientProfile.id,
            doctorId: doctor.id,
            date: selectedDate,
            time: selectedTimeSlot,
            status: "pending",
            reason: "General consultation",
            createdAt: new Date().toISOString().split("T")[0],
        };

        dispatch(addAppointment(newAppointment));
        alert("Appointment consultation successfully scheduled.");
        navigate("/patient/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-5xl p-8 space-y-8">

                    {/* Doctor Header Banner */}

                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800">

                        <div className="flex flex-col sm:flex-row items-center gap-6">

                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 text-white text-3xl font-extrabold flex items-center justify-center shadow-lg border-2 border-white/20 shrink-0">
                                {doctor.name
                                    .replace(/^Dr\.?\s*/i, "")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="text-center sm:text-left">

                                <div className="flex items-center justify-center sm:justify-start gap-2">

                                    <h1 className="text-3xl font-extrabold text-white">
                                        {doctor.name}
                                    </h1>

                                    {doctor.verified && (
                                        <span className="bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-0.5 rounded-full text-xs font-semibold">
                                            ✔ Verified Physician
                                        </span>
                                    )}

                                </div>

                                <p className="text-teal-300 font-semibold mt-1">
                                    {doctor.specialization}
                                </p>

                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-xs text-slate-300">

                                    <span className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
                                        📍 {doctor.location}
                                    </span>

                                    <span className="bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
                                        💼 {doctor.experience}
                                    </span>

                                    <span className="bg-amber-400/20 text-amber-300 px-3.5 py-1.5 rounded-xl border border-amber-400/30 font-bold">
                                        ⭐ {doctor.rating} Rating
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Date & Time Picker Container */}

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-8 space-y-8">

                        <div>

                            <h2 className="text-lg font-bold text-slate-900 mb-2">
                                1. Select Preferred Consultation Date
                            </h2>

                            <p className="text-xs text-slate-500 mb-4">
                                Choose an available date on the clinical calendar.
                            </p>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-slate-200 rounded-2xl px-5 py-3 text-sm w-full md:w-80 font-semibold text-slate-800 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                            />

                            {selectedDate && (
                                <p className="mt-3 text-xs text-slate-600">
                                    Selected Day of Week: <span className="font-bold text-teal-600">{dayName}</span>
                                </p>
                            )}

                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-slate-900 mb-2">
                                2. Select Available Time Slot
                            </h2>

                            {available ? (

                                <div className="flex flex-wrap gap-3 mt-4">

                                    {available.slots.map((slot) => (

                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTimeSlot(slot)}
                                            className={`px-5 py-3 rounded-2xl text-xs font-bold transition duration-200 shadow-sm ${
                                                selectedTimeSlot === slot
                                                    ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-105"
                                                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-teal-50 hover:border-teal-300"
                                            }`}
                                        >
                                            🕒 {slot}
                                        </button>

                                    ))}

                                </div>

                            ) : (

                                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-xs">

                                    <p className="font-bold text-rose-700">
                                        Physician is unavailable on {dayName || "the selected date"}.
                                    </p>

                                    <p className="text-slate-500 mt-1">
                                        Please select a different date on the calendar above.
                                    </p>

                                </div>

                            )}

                        </div>

                        {/* Booking State Display */}

                        {selectedTimeSlot && (

                            existingAppointment ? (

                                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-rose-900">

                                    <h3 className="font-bold text-base text-rose-700 mb-1">
                                        ⚠️ Reserved Slot Notice
                                    </h3>

                                    <p className="text-xs text-slate-600 mb-4">
                                        This time slot ({selectedTimeSlot} on {selectedDate}) is already booked. Please choose another time.
                                    </p>

                                </div>

                            ) : (

                                <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-2xl p-6 text-white shadow-lg space-y-4">

                                    <h3 className="font-extrabold text-base text-white">
                                        Consultation Summary
                                    </h3>

                                    <div className="grid sm:grid-cols-3 gap-4 text-xs text-slate-300">

                                        <div>
                                            <span className="text-slate-400 block">Physician</span>

                                            <span className="font-bold text-white text-sm">{doctor.name}</span>
                                        </div>

                                        <div>
                                            <span className="text-slate-400 block">Date</span>

                                            <span className="font-bold text-white text-sm">{selectedDate}</span>
                                        </div>

                                        <div>
                                            <span className="text-slate-400 block">Time</span>

                                            <span className="font-bold text-white text-sm">{selectedTimeSlot}</span>
                                        </div>

                                    </div>

                                    <button
                                        onClick={handleConfirmBooking}
                                        className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow transition"
                                    >
                                        Confirm Consultation
                                    </button>

                                </div>

                            )

                        )}

                    </div>

                </main>

            </div>
        </div>
    );
}

export default BookAppointment;