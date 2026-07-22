import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { logout } from "../redux/slices/authSlice";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!auth.user) {
        return null;
    }

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md border-b border-gray-200 px-8 py-4 flex justify-between items-center relative">
    
            <div>
                <h1 className="text-3xl font-bold text-blue-600 cursor-pointer">
                    Medico
                </h1>
            </div>

            <div className="relative">
                <button
                    onClick={handleDropdown}
                    className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition duration-200"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
                        {auth.user.name.charAt(0)}
                    </div>

                    <span className="font-medium text-gray-700">
                        {auth.user.name}
                    </span>

                    <svg
                        className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                        <div className="px-5 py-4 border-b">
                            <h3 className="font-semibold text-gray-800">
                                {auth.user.name}
                            </h3>

                            <p className="text-sm text-gray-500 capitalize">
                                {auth.user.role}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;