import { useState } from "react";
import { useSelector } from "react-redux";

import patients from "../../data/dummyPatients.json";
import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function MedicalHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);

    const auth = useSelector((state) => state.auth);
    const records = useSelector((state) => state.records?.records || []);

    const currentUserId = auth.user ? auth.user.id : 4;

    const patientProfile = patients.find(
        (p) => p.userId === currentUserId
    ) || patients[0];

    const myRecords = records.filter(
        (r) => r.patientId === patientProfile.id
    );

    const filteredRecords = myRecords.filter((record) => {
        const doctor = doctors.find((d) => d.id === record.doctorId);
        const doctorName = doctor ? doctor.name.toLowerCase() : "";
        const diagnosis = record.diagnosis ? record.diagnosis.toLowerCase() : "";
        const search = searchTerm.toLowerCase();

        return diagnosis.includes(search) || doctorName.includes(search);
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-6xl p-8 space-y-8">

                    {/* Page Header */}

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">

                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Medical History & Clinical Records
                        </h1>

                        <p className="text-xs text-slate-500 mt-1">
                            Diagnoses, lab test diagnostics, and electronic prescriptions.
                        </p>

                    </div>

                    {/* Search Bar */}

                    <div className="relative max-w-md">

                        <input
                            type="text"
                            placeholder="Filter records by diagnosis or doctor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />

                        <span className="absolute left-3.5 top-3.5 text-slate-400 text-xs">
                            🔍
                        </span>

                    </div>

                    {/* Records List */}

                    {filteredRecords.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">

                            <div className="text-4xl mb-3">📋</div>

                            <h3 className="text-lg font-bold text-slate-800">
                                No clinical records found
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                {searchTerm ? "No records match your query." : "No electronic records on file."}
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {filteredRecords.map((record) => {

                                const doctor = doctors.find((d) => d.id === record.doctorId) || {
                                    name: "Dr. Unknown",
                                    specialization: "General Practice",
                                };

                                return (

                                    <div
                                        key={record.id}
                                        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition space-y-4"
                                    >

                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-2">

                                            <div>

                                                <span className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                                                    Diagnosis Report
                                                </span>

                                                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                                                    {record.diagnosis}
                                                </h3>

                                                <p className="text-xs font-semibold text-slate-600 mt-1">
                                                    👨‍⚕️ Attending Physician: <span className="text-slate-900 font-bold">{doctor.name}</span> ({doctor.specialization})
                                                </p>

                                            </div>

                                            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl border border-slate-200">
                                                📅 {record.date}
                                            </span>

                                        </div>

                                        {record.prescription && record.prescription.length > 0 && (

                                            <div>

                                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-3">
                                                    Rx Prescriptions ({record.prescription.length})
                                                </h4>

                                                <div className="grid sm:grid-cols-2 gap-3">

                                                    {record.prescription.map((med, idx) => (

                                                        <div
                                                            key={idx}
                                                            className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs"
                                                        >

                                                            <p className="font-bold text-slate-900">
                                                                {med.medicine} — <span className="text-teal-600 font-bold">{med.dosage}</span>
                                                            </p>

                                                            <p className="text-slate-500 mt-1">
                                                                {med.frequency} • {med.duration}
                                                            </p>

                                                        </div>

                                                    ))}

                                                </div>

                                            </div>

                                        )}

                                        {record.labResults && record.labResults.length > 0 && (

                                            <div>

                                                <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-3">
                                                    Lab Diagnostic Results ({record.labResults.length})
                                                </h4>

                                                <div className="flex flex-wrap gap-3">

                                                    {record.labResults.map((lab, idx) => (

                                                        <div
                                                            key={idx}
                                                            className="bg-emerald-50/80 text-emerald-900 px-4 py-2 rounded-2xl border border-emerald-200/80 text-xs"
                                                        >

                                                            <span className="font-bold">{lab.test}:</span> {lab.result}

                                                            <span className="text-[10px] text-emerald-700 block">Normal Range: {lab.normalRange}</span>

                                                        </div>

                                                    ))}

                                                </div>

                                            </div>

                                        )}

                                        {record.notes && (

                                            <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl text-xs text-amber-900">

                                                <span className="font-bold">Clinical Notes:</span> {record.notes}

                                            </div>

                                        )}

                                        <div className="pt-2 flex justify-end">

                                            <button
                                                onClick={() => setSelectedRecord(record)}
                                                className="bg-slate-900 hover:bg-teal-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition shadow"
                                            >
                                                View Summary Details
                                            </button>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    )}

                    {/* Modal */}

                    {selectedRecord && (

                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                            <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative">

                                <button
                                    onClick={() => setSelectedRecord(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                                    Clinical Summary Sheet
                                </h2>

                                <p className="text-xs text-slate-500 mb-6">
                                    Record Date: {selectedRecord.date}
                                </p>

                                <div className="space-y-4 text-xs">

                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">

                                        <span className="text-slate-400 font-semibold uppercase">Diagnosis</span>

                                        <p className="text-lg font-extrabold text-slate-900 mt-1">
                                            {selectedRecord.diagnosis}
                                        </p>

                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">

                                        <span className="text-slate-400 font-semibold uppercase">Notes & Observations</span>

                                        <p className="text-slate-800 font-medium mt-1">
                                            {selectedRecord.notes || "No notes provided."}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-6 flex justify-end">

                                    <button
                                        onClick={() => setSelectedRecord(null)}
                                        className="bg-slate-200 text-slate-800 px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-300 transition"
                                    >
                                        Close Window
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </main>

            </div>
        </div>
    );
}

export default MedicalHistory;
