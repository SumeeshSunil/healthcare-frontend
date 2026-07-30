import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Unauthorized from "../pages/auth/Unauthorized";
import DemoHome from "../pages/DemoHome";
import NotFound from "../pages/NotFound";

import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorSearch from "../pages/patient/DoctorSearch";
import BookAppointment from "../pages/patient/BookAppointment";
import MyAppointments from "../pages/patient/MyAppointments";
import MedicalHistory from "../pages/patient/MedicalHistory";
import PatientBilling from "../pages/patient/PatientBilling";
import PatientProfile from "../pages/patient/PatientProfile";
import Notifications from "../pages/patient/Notifications";
import Messages from "../pages/patient/Messages";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorAppointments from "../pages/doctor/DoctorAppointments";
import DoctorSchedule from "../pages/doctor/DoctorSchedule";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import IssueCertificate from "../pages/doctor/IssueCertificate";
import PatientRecordView from "../pages/doctor/PatientRecordView";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageSchedules from "../pages/admin/ManageSchedules";
import AdminReports from "../pages/admin/AdminReports";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemoHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/doctor-search" element={<DoctorSearch />} />
            <Route path="/patient/book-appointment/:doctorId" element={<BookAppointment />} />
            <Route path="/patient/my-appointments" element={<MyAppointments />} />
            <Route path="/patient/medical-history" element={<MedicalHistory />} />
            <Route path="/patient/billing" element={<PatientBilling />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/notifications" element={<Notifications />} />
            <Route path="/patient/messages" element={<Messages />} />

            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/schedule" element={<DoctorSchedule />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/issue-certificate" element={<IssueCertificate />} />
            <Route path="/doctor/patient-records" element={<PatientRecordView />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/schedules" element={<ManageSchedules />} />
            <Route path="/admin/reports" element={<AdminReports />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;