import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import users from "../../data/dummyUsers.json";

function Login() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (u) => u.email === emailInput && u.password === passwordInput
    );

    if (foundUser) {
      dispatch(loginSuccess(foundUser));

      if (foundUser.role === "admin") {
        navigate('/admin/dashboard');
      } else if (foundUser.role === "doctor") {
        navigate('/doctor/dashboard');
      } else if (foundUser.role === "patient") {
        navigate('/patient/dashboard');
      }
    } else {
      dispatch(loginFailure("Invalid username or password"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-800">

        <div className="text-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-teal-600 to-teal-400 text-white flex items-center justify-center font-black text-2xl shadow-lg mx-auto mb-4">
            ✚
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            MEDICO <span className="text-teal-600 font-bold">PORTAL</span>
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your electronic health record
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">

          <div>

            <label className="block font-bold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="patient@healthcare.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900 text-xs"
              required
            />

          </div>

          <div>

            <label className="block font-bold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900 text-xs"
              required
            />

          </div>

          {auth.error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold text-xs">
              {auth.error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-teal-600/25"
          >
            Access Portal
          </button>

          <div className="text-center pt-2 text-xs text-slate-500">

            Need an account?{" "}

            <Link to="/register" className="text-teal-600 font-bold hover:underline">
              Register here
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Login;