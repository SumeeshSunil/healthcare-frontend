import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DemoHome from "../pages/DemoHome";
import Register from "../pages/auth/Register";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorSearch from "../pages/patient/DoctorSearch";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import MedicalHistory from "../pages/patient/MedicalHistory";
import PatientBilling from "../pages/patient/PatientBilling";
import PatientProfile from "../pages/patient/PatientProfile";
import Notifications from "../pages/patient/Notifications";
import Messages from "../pages/patient/Messages";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemoHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/doctor-search" element={<DoctorSearch />} />
            <Route path="/patient/book-appointment/:doctorId" element={<BookAppointment />} />
            <Route path="/patient/my-appointments" element={<MyAppointments />} />
            <Route path="/patient/medical-history" element={<MedicalHistory />} />
            <Route path="/patient/billing" element={<PatientBilling />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/notifications" element={<Notifications />} />
            <Route path="/patient/messages" element={<Messages />} />
        </Routes>
    )
}

export default AppRoutes;