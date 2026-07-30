import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import dummyUsers from "../../data/dummyUsers.json";

function Login() {
    const [selectedUserId, setSelectedUserId] = useState(4);
    const [email, setEmail] = useState("kannan@healthcare.com");
    const [password, setPassword] = useState("patient123");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSelectPresetUser = (uId) => {
        const userObj = dummyUsers.find((u) => u.id === parseInt(uId, 10));
        if (userObj) {
            setSelectedUserId(userObj.id);
            setEmail(userObj.email);
            setPassword(userObj.password);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObj = dummyUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
            id: selectedUserId,
            name: email.split("@")[0],
            email: email,
            role: "patient"
        };

        dispatch(login(userObj));

        if (userObj.role === "patient") navigate("/patient/dashboard");
        else if (userObj.role === "doctor") navigate("/doctor/dashboard");
        else navigate("/admin/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-950 pointer-events-none"></div>

            <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative z-10 space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-teal-600 to-teal-400 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-lg shadow-teal-500/20">
                        ✚
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        MEDICO <span className="text-teal-600">PORTAL</span>
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        Sign in to access your healthcare portal account
                    </p>
                </div>

                <div>
                    <label className="block font-bold text-slate-700 mb-1.5 text-xs">
                        Select Portal User
                    </label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => handleSelectPresetUser(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-xs font-bold focus:outline-none focus:border-teal-500"
                    >
                        {dummyUsers.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name} ({u.role.toUpperCase()}) — {u.email}
                            </option>
                        ))}
                    </select>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-teal-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Security Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-teal-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-teal-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg text-xs tracking-wider uppercase"
                    >
                        Sign In to Account
                    </button>
                </form>

                <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold text-teal-600 hover:underline">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;