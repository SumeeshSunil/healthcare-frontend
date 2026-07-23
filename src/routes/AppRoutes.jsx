import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DemoHome from "../pages/DemoHome";
import Register from "../pages/auth/Register";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorSearch from "../pages/patient/DoctorSearch";
import BookAppointment from "../pages/patient/BookAppointment";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemoHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/doctor-search" element={<DoctorSearch />} />
            <Route path="/patient/book-appointment/:doctorId" element={<BookAppointment />} />
        </Routes>
    )
}

export default AppRoutes;