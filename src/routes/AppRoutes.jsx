import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DemoHome from "../pages/DemoHome";
import Register from "../pages/auth/Register";
import PatientDashboard from "../pages/patient/PatientDashboard";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemoHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
        </Routes>
    )
}

export default AppRoutes;