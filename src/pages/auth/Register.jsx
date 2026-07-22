import { useState } from "react";

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
    console.log("Submit Logic Goes Here");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Register as a Patient or Doctor
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Role */}

          <div className="border rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-3">
              Register As
            </h2>

            <div className="flex gap-10">

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={role === "patient"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-600"
                />
                Patient
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={role === "doctor"}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-600"
                />
                Doctor
              </label>

            </div>
          </div>

          {/* Name */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Patient */}

          {role === "patient" && (
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>

                <input
                  type="text"
                  placeholder="Enter your address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>

                <input
                  type="date"
                  value={dobInput}
                  onChange={(e) => setDobInput(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          )}

          {/* Doctor */}

          {role === "doctor" && (
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialization
                </label>

                <input
                  type="text"
                  placeholder="Enter your specialization"
                  value={specializationInput}
                  onChange={(e) =>
                    setSpecializationInput(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Years of Experience
                </label>

                <input
                  type="number"
                  placeholder="Enter years of experience"
                  value={experienceInput}
                  onChange={(e) =>
                    setExperienceInput(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Qualification
                </label>

                <input
                  type="text"
                  placeholder="Enter your qualification"
                  value={qualificationInput}
                  onChange={(e) =>
                    setQualificationInput(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;