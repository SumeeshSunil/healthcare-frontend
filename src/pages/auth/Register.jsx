import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            id: Date.now(),
            name: name || "New User",
            email: email,
            role: role
        };

        dispatch(login(newUser));

        if (role === "patient") navigate("/patient/dashboard");
        else if (role === "doctor") navigate("/doctor/dashboard");
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
                        CREATE <span className="text-teal-600">ACCOUNT</span>
                    </h1>
                    <p className="text-xs text-slate-500 font-medium">
                        Join the integrated clinical healthcare network
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Register As</label>
                        <div className="grid grid-cols-2 gap-2">
                            {["patient", "doctor"].map((r) => (
                                <button
                                    type="button"
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`py-2 rounded-xl text-xs font-bold capitalize transition border ${
                                        role === r
                                            ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                    }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-teal-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-teal-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-slate-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            placeholder="Create strong password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-teal-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg text-xs tracking-wider uppercase"
                    >
                        Register Account
                    </button>
                </form>

                <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                    Already registered?{" "}
                    <Link to="/login" className="font-bold text-teal-600 hover:underline">
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;