import { useState } from "react";
import { useSelector } from "react-redux";
import doctors from "../../data/dummyDoctors.json";
import Layout from "../../components/Layout";

function DoctorProfile() {
    const auth = useSelector((state) => state.auth);
    const doctorData = doctors.find((d) => d.userId === auth?.user?.id || d.name === auth?.user?.name) || doctors[0];

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: doctorData.name,
        specialization: doctorData.specialization,
        location: doctorData.location || "Kochi, Kerala",
        experience: doctorData.experience || "12 years",
        fee: doctorData.fee || 500,
        phone: "+91 98470 12345",
        email: auth?.user?.email || "arjun.menon@healthcare.com",
        bio: "Senior cardiologist specialist dedicated to evidence-based medical diagnostics, patient wellness, and preventive care in Kerala."
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        alert("Doctor credentials profile updated successfully.");
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 gap-4">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-slate-900 to-teal-900 text-teal-300 font-extrabold text-2xl sm:text-3xl flex items-center justify-center border-2 border-white shadow-md shrink-0">
                            🩺
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                {profile.name}
                            </h1>
                            <p className="text-xs font-bold text-teal-600 mt-0.5">
                                {profile.specialization} • {profile.location} • License #MCI-84910
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-slate-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow w-full sm:w-auto"
                    >
                        {isEditing ? "Cancel Edit" : "Edit Credentials"}
                    </button>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Doctor Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={profile.specialization}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Consultation Fee (₹)</label>
                                <input
                                    type="number"
                                    name="fee"
                                    value={profile.fee}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Experience Summary</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={profile.experience}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-2">Professional Bio</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                            ></textarea>
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
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Specialty</p>
                                <p className="text-sm font-extrabold text-teal-600 mt-1">{profile.specialization}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Consultation Fee</p>
                                <p className="text-sm font-extrabold text-slate-900 mt-1">₹{profile.fee}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 sm:col-span-3 lg:col-span-1">
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Experience</p>
                                <p className="text-sm font-extrabold text-slate-800 mt-1">{profile.experience}</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Professional Summary</p>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{profile.bio}</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default DoctorProfile;
