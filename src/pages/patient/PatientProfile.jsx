import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updatePatientProfile } from "../../redux/slices/patientSlice";

import patients from "../../data/dummyPatients.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function PatientProfile() {
    const auth = useSelector((state) => state.auth);
    const patientsList = useSelector((state) => state.patient?.patients || patients);
    const dispatch = useDispatch();

    const currentUserId = auth.user ? auth.user.id : 4;

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
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-4xl p-8 space-y-8">

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80">

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-8 gap-4">

                            <div className="flex items-center gap-5">

                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-900 text-teal-300 font-extrabold text-3xl flex items-center justify-center border-2 border-white shadow-md">
                                    {formData.name.charAt(0).toUpperCase()}
                                </div>

                                <div>

                                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                        {formData.name}
                                    </h1>

                                    <p className="text-xs text-slate-400 font-semibold mt-1">
                                        Electronic Health Record ID: #{currentPatient.id}
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-slate-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow"
                            >
                                {isEditing ? "Cancel Edit" : "Edit Health Profile"}
                            </button>

                        </div>

                        {isEditing ? (

                            <form onSubmit={handleSubmit} className="space-y-6 text-xs">

                                <div className="grid md:grid-cols-2 gap-6">

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Full Patient Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Contact Phone
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Age (Years)
                                        </label>

                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Biological Gender
                                        </label>

                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Blood Group
                                        </label>

                                        <select
                                            name="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                        >
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 font-bold mb-2">
                                            Emergency Contact Number
                                        </label>

                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                            required
                                        />
                                    </div>

                                </div>

                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">
                                        Residential Address
                                    </label>

                                    <textarea
                                        name="address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl text-xs transition shadow"
                                >
                                    Save Updated Information
                                </button>

                            </form>

                        ) : (

                            <div className="grid md:grid-cols-2 gap-6 text-xs">

                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Phone Contact
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                                        {formData.phone}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Age / Gender
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                                        {formData.age} Years ({formData.gender})
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Blood Group
                                    </p>
                                    <p className="text-sm font-extrabold text-rose-600 mt-1">
                                        🩸 {formData.bloodGroup}
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Emergency Contact
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                                        📞 {formData.emergencyContact}
                                    </p>
                                </div>

                                <div className="md:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        Residential Location
                                    </p>
                                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                                        📍 {formData.address}
                                    </p>
                                </div>

                            </div>

                        )}

                    </div>

                </main>

            </div>
        </div>
    );
}

export default PatientProfile;
