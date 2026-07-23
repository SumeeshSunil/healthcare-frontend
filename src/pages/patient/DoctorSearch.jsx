import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

import doctors from "../../data/dummyDoctors.json";

function DoctorSearch() {
    const [searchText, setSearchText] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchRef = useRef(null);
    const navigate = useNavigate()

    // Get unique specializations
    const specializations = [...new Set(doctors.map((d) => d.specialization))];

    // Filter suggestions while typing
    const filteredSpecializations = specializations.filter((spec) =>
        spec.toLowerCase().includes(searchText.toLowerCase())
    );

    // Show doctors of selected specialization
    const filteredDoctors = selectedSpecialization
        ? doctors.filter((d) => d.specialization === selectedSpecialization)
        : [];

    const handleSelectSpecialization = (spec) => {
        setSelectedSpecialization(spec);
        setSearchText(spec);
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-10">

                <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
                    Find a Doctor
                </h1>

                {/* Search Box */}
                <div ref={searchRef} className="relative max-w-lg mx-auto">

                    <input
                        type="text"
                        placeholder="Search specialization..."
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            setShowSuggestions(true);
                            setSelectedSpecialization("");
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {showSuggestions && filteredSpecializations.length > 0 && (
                        <div className="absolute w-full bg-white rounded-lg shadow-lg mt-2 border z-10">

                            {filteredSpecializations.map((spec) => (
                                <div
                                    key={spec}
                                    onClick={() => handleSelectSpecialization(spec)}
                                    className="px-5 py-3 cursor-pointer hover:bg-blue-100 transition"
                                >
                                    {spec}
                                </div>
                            ))}

                        </div>
                    )}
                </div>

                {/* Doctor Cards */}

                {selectedSpecialization && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6"
                            >
                                {/* Profile Circle */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-24 h-24 rounded-full border-4 border-blue-200 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                                        {doctor.name
                                            .replace(/^Dr\.?\s*/i, "")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                </div>

                                {/* Doctor Name */}
                                <h2 className="text-2xl font-bold text-center text-gray-800">
                                    {doctor.name}
                                </h2>

                                {/* Specialization */}
                                <p className="text-center text-blue-600 font-semibold mt-2">
                                    {doctor.specialization}
                                </p>

                                {/* Details */}
                                <div className="mt-5 space-y-2 text-gray-600">
                                    <p>
                                        <span className="font-semibold">
                                            Experience:
                                        </span>{" "}
                                        {doctor.experience}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Location:
                                        </span>{" "}
                                        {doctor.location}
                                    </p>

                                    <p>
                                        <span className="font-semibold">
                                            Rating:
                                        </span>{" "}
                                        {doctor.rating} ★
                                    </p>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                                    Book Appointment
                                </button>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorSearch;
