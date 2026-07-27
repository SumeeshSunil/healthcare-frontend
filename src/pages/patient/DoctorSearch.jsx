import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import doctors from "../../data/dummyDoctors.json";

function DoctorSearch() {
    const [searchText, setSearchText] = useState("");
    const [selectedSpecialization, setSelectedSpecialization] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchRef = useRef(null);
    const navigate = useNavigate();

    const specializations = [...new Set(doctors.map((d) => d.specialization))];

    const filteredSpecializations = specializations.filter((spec) =>
        spec.toLowerCase().includes(searchText.toLowerCase())
    );

    const filteredDoctors = selectedSpecialization
        ? doctors.filter((d) => d.specialization === selectedSpecialization)
        : doctors;

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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-7xl p-8 space-y-8">

                    {/* Page Header */}

                    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">

                        <div className="relative z-10 max-w-xl">

                            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
                                Specialist Directory
                            </span>

                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                                Find a Clinical Specialist
                            </h1>

                            <p className="text-slate-300 mt-2 text-sm leading-relaxed">
                                Search certified healthcare physicians, cardiologists, dermatologists, and surgeons available for consultation.
                            </p>

                        </div>

                    </div>

                    {/* Search Bar */}

                    <div ref={searchRef} className="relative max-w-2xl mx-auto">

                        <div className="relative">

                            <input
                                type="text"
                                placeholder="Search by medical specialization (e.g. Cardiology, Dermatology)..."
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                    setShowSuggestions(true);
                                    if (!e.target.value) setSelectedSpecialization("");
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full pl-12 pr-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
                            />

                            <div className="absolute left-4 top-4 text-slate-400 text-lg">
                                🔍
                            </div>

                        </div>

                        {showSuggestions && filteredSpecializations.length > 0 && (
                            <div className="absolute w-full bg-white rounded-2xl shadow-2xl mt-2 border border-slate-200 z-20 overflow-hidden">

                                {filteredSpecializations.map((spec) => (
                                    <div
                                        key={spec}
                                        onClick={() => handleSelectSpecialization(spec)}
                                        className="px-6 py-3.5 cursor-pointer hover:bg-teal-50 hover:text-teal-700 transition text-sm font-semibold text-slate-700 border-b border-slate-100 last:border-0 flex justify-between items-center"
                                    >
                                        <span>{spec}</span>

                                        <span className="text-xs text-slate-400 font-normal">Select →</span>
                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                    {/* Filter Pills */}

                    <div className="flex flex-wrap gap-2 justify-center">

                        <button
                            onClick={() => {
                                setSelectedSpecialization("");
                                setSearchText("");
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                                !selectedSpecialization
                                    ? "bg-teal-600 text-white border-teal-600 shadow"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                            All Doctors ({doctors.length})
                        </button>

                        {specializations.map((spec) => (

                            <button
                                key={spec}
                                onClick={() => handleSelectSpecialization(spec)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                                    selectedSpecialization === spec
                                        ? "bg-teal-600 text-white border-teal-600 shadow"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                            >
                                {spec}
                            </button>

                        ))}

                    </div>

                    {/* Doctors Cards Grid */}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {filteredDoctors.map((doctor) => (

                            <div
                                key={doctor.id}
                                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-teal-300 transition duration-300 flex flex-col justify-between"
                            >

                                <div>

                                    <div className="flex items-center gap-4 mb-5">

                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-900 text-teal-300 font-extrabold text-2xl flex items-center justify-center shadow border-2 border-white shrink-0">
                                            {doctor.name
                                                .replace(/^Dr\.?\s*/i, "")
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>

                                            <div className="flex items-center gap-2">

                                                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                                    {doctor.name}
                                                </h3>

                                                {doctor.verified && (
                                                    <span className="text-teal-600 text-sm" title="Verified Physician">
                                                        ✔
                                                    </span>
                                                )}

                                            </div>

                                            <p className="text-xs font-bold text-teal-600 mt-1">
                                                {doctor.specialization}
                                            </p>

                                            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-500 font-bold">
                                                <span>⭐ {doctor.rating}</span>

                                                <span className="text-slate-400 font-normal">Rating</span>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="space-y-2 py-4 border-t border-b border-slate-100 text-xs text-slate-600">

                                        <div className="flex justify-between">
                                            <span className="text-slate-400 font-medium">Experience:</span>

                                            <span className="font-bold text-slate-800">{doctor.experience}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-slate-400 font-medium">Hospital Location:</span>

                                            <span className="font-bold text-slate-800">📍 {doctor.location}</span>
                                        </div>

                                    </div>

                                </div>

                                <button
                                    onClick={() => navigate(`/patient/book-appointment/${doctor.id}`)}
                                    className="w-full mt-6 bg-slate-900 hover:bg-teal-600 text-white py-3 rounded-xl text-xs font-bold transition duration-200 shadow"
                                >
                                    Schedule Consultation
                                </button>

                            </div>

                        ))}

                    </div>

                </main>

            </div>
        </div>
    );
}

export default DoctorSearch;
