import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [role, setRole] = useState("patient");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [dobInput, setDobInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [mobileInput, setMobileInput] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");
  const [specializationInput, setSpecializationInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-slate-800">

        <div className="text-center mb-8">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-teal-600 to-teal-400 text-white flex items-center justify-center font-black text-xl shadow-lg mx-auto mb-3">
            ✚
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Account
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Register as a Patient or Healthcare Practitioner
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">

            <label className="block font-bold text-slate-700 mb-2">
              Registration Role
            </label>

            <div className="flex gap-8">

              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-teal-600"
                />
                Patient Account
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-teal-600"
                />
                Physician Practitioner
              </label>

            </div>

          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Full Legal Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@domain.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              Account Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
            />
          </div>

          {role === "patient" && (
            <div className="space-y-4 pt-2">

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Residential Address
                </label>

                <input
                  type="text"
                  placeholder="Enter full address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Mobile Contact Number
                </label>

                <input
                  type="text"
                  placeholder="Enter contact number"
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Date of Birth
                </label>

                <input
                  type="date"
                  value={dobInput}
                  onChange={(e) => setDobInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

            </div>
          )}

          {role === "doctor" && (
            <div className="space-y-4 pt-2">

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Medical Specialization
                </label>

                <input
                  type="text"
                  placeholder="e.g. Cardiology, Orthopedics"
                  value={specializationInput}
                  onChange={(e) =>
                    setSpecializationInput(e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Years of Practice
                </label>

                <input
                  type="number"
                  placeholder="Years in practice"
                  value={experienceInput}
                  onChange={(e) =>
                    setExperienceInput(e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Medical Qualifications
                </label>

                <input
                  type="text"
                  placeholder="e.g. MBBS, MD"
                  value={qualificationInput}
                  onChange={(e) =>
                    setQualificationInput(e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                />
              </div>

            </div>
          )}

          {error && (
            <p className="text-rose-600 font-bold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-teal-600/25"
          >
            Create Account
          </button>

          <div className="text-center pt-2 text-slate-500">

            Already registered?{" "}

            <Link to="/login" className="text-teal-600 font-bold hover:underline">
              Sign In
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Register;