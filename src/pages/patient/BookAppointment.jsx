import { useState } from "react";
import { useParams } from "react-router-dom";

import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";

function BookAppointment() {

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

    const doctor = doctors.find((d) => d.id === Number(doctorId));

    const dateObj = new Date(selectedDate);
    const dayIndex = dateObj.getDay();
    const dayName = dayNames[dayIndex];

    const available = doctor.availability.find((a) => a.day === dayName);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-100">
            <Navbar />

            <div className="max-w-5xl mx-auto px-5 py-10">

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white">

                    {/* Header */}

                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-white">

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            <div className="w-32 h-32 rounded-full bg-white text-blue-700 text-5xl font-bold flex items-center justify-center shadow-xl border-4 border-white">

                                {doctor.name
                                    .replace(/^Dr\.?\s*/i, "")
                                    .charAt(0)
                                    .toUpperCase()}

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold">
                                    {doctor.name}
                                </h1>

                                <p className="text-blue-100 text-lg mt-2">
                                    {doctor.specialization}
                                </p>

                                <div className="flex flex-wrap gap-3 mt-5">

                                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                                        📍 {doctor.location}
                                    </span>

                                    <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                                        💼 {doctor.experience}
                                    </span>

                                    <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                                        ⭐ {doctor.rating}
                                    </span>

                                    {doctor.verified && (
                                        <span className="bg-green-500 px-4 py-2 rounded-full text-sm">
                                            ✔ Verified
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Body */}

                    <div className="p-10">

                        <div className="mb-10">

                            <h2 className="text-2xl font-bold text-gray-800 mb-5">
                                Select Appointment Date
                            </h2>

                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border-2 border-gray-200 rounded-xl px-5 py-3 text-lg w-full md:w-80 focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
                            />

                            {selectedDate && (
                                <p className="mt-3 text-gray-600">
                                    Selected Day:
                                    <span className="font-semibold text-blue-600 ml-2">
                                        {dayName}
                                    </span>
                                </p>
                            )}

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-5">
                                Available Time Slots
                            </h2>

                            {available ? (

                                <div className="flex flex-wrap gap-4">

                                    {available.slots.map((slot) => (

                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTimeSlot(slot)}
                                            className={`px-6 py-3 rounded-xl font-semibold transition duration-300 shadow-md
                                                
                                                ${
                                                    selectedTimeSlot === slot
                                                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white scale-105 shadow-xl"
                                                        : "bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                                }`}
                                        >

                                            🕒 {slot}

                                        </button>

                                    ))}

                                </div>

                            ) : (

                                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">

                                    <h3 className="text-red-600 text-xl font-semibold">
                                        Doctor is not available on {dayName || "the selected day"}
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        Please choose another date.
                                    </p>

                                </div>

                            )}

                        </div>

                        {selectedTimeSlot && (

                            <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">

                                <h2 className="text-2xl font-bold">
                                    Appointment Summary
                                </h2>

                                <div className="mt-4 space-y-2">

                                    <p>
                                        <span className="font-semibold">Doctor:</span>{" "}
                                        {doctor.name}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Date:</span>{" "}
                                        {selectedDate}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Time:</span>{" "}
                                        {selectedTimeSlot}
                                    </p>

                                </div>

                                <button className="mt-6 bg-white text-green-700 px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
                                    Confirm Appointment
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookAppointment;