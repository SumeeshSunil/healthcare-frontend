import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updatePatientProfile } from "../../redux/slices/patientSlice";
import patients from "../../data/dummyPatients.json";
import Layout from "../../components/Layout";

function PatientProfile() {
    const auth = useSelector((state) => state.auth);
    const patientsList = useSelector((state) => state.patient?.patients || patients);
    const dispatch = useDispatch();

    const currentUserId = auth?.user ? auth.user.id : 4;

    const currentPatient = patientsList.find(
        (p) => p.userId === currentUserId
    ) || patientsList[0];

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentPatient.name || "",
        age: currentPatient.age || "",
        gender: currentPatient.gender || "Male",
        bloodGroup: currentPatient.bloodGroup || "O+",
        phone: currentPatient.phone || "",
        address: currentPatient.address || "",
        emergencyContact: currentPatient.emergencyContact || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
            updatePatientProfile({
                id: currentPatient.id,
                ...formData,
            })
        );

        setIsEditing(false);
        alert("Patient health profile successfully updated.");
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-8 gap-4">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-900 text-teal-300 font-extrabold text-2xl sm:text-3xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
                            {formData.name ? formData.name.charAt(0).toUpperCase() : "P"}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                {formData.name}
                            </h1>
                            <p className="text-[11px] sm:text-xs text-slate-400 font-semibold mt-1">
                                Electronic Health Record ID: #{currentPatient.id}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-slate-900 hover:bg-teal-600 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition shadow w-full sm:w-auto"
                    >
                        {isEditing ? "Cancel Edit" : "Edit Health Profile"}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                >
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Emergency Contact</label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block font-bold text-slate-700 mb-2">Residential Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-md shadow-teal-600/20"
                            >
                                Save Profile Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Age</p>
                                <p className="text-base font-extrabold text-slate-800 mt-1">{currentPatient.age} years</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gender</p>
                                <p className="text-base font-extrabold text-slate-800 mt-1">{currentPatient.gender}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Blood Group</p>
                                <p className="text-base font-extrabold text-teal-600 mt-1">{currentPatient.bloodGroup}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 sm:col-span-2 md:col-span-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
                                <p className="text-base font-extrabold text-slate-800 mt-1">{currentPatient.phone}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 sm:col-span-2">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Emergency Contact</p>
                                <p className="text-base font-extrabold text-rose-600 mt-1">{currentPatient.emergencyContact}</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Registered Address</p>
                            <p className="text-sm font-semibold text-slate-700 mt-1">{currentPatient.address}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default PatientProfile;
