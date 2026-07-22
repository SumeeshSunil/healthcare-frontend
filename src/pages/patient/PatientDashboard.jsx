import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import patients from "../../data/dummyPatients.json";
import appointments from "../../data/dummyAppointments.json";
import doctors from "../../data/dummyDoctors.json";
import bills from "../../data/dummyBills.json";

import Navbar from "../../components/Navbar";

function PatientDashboard() {
    const auth = useSelector((state) => state.auth);

    const patientProfile = patients.find(
        (p) => p.userId === auth.user.id
    );

    const myAppointments = appointments.filter(
        (a) => a.patientId === patientProfile.id
    );

    const upcomingAppointments = myAppointments.filter(
        (a) => a.status !== "cancelled"
    ).length;

    const myBills = bills.filter((b) => b.patientId === patientProfile.id)
    const unpaidBills = myBills.filter((b) => b.status === "unpaid").length

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-700";

            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            case "completed":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-7xl mx-auto p-8">

                {/* Welcome */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {auth.user.name}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your appointments and health records from your dashboard.
                    </p>
                </div>

                {/* Quick Stats */}

                <div className="grid md:grid-cols-2 gap-6 mb-8">

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500">
                            Upcoming Appointments
                        </h3>

                        <p className="text-4xl font-bold text-blue-600 mt-2">
                            {upcomingAppointments}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-gray-500">
                            Unpaid Bills
                        </h3>

                        <p className="text-4xl font-bold text-red-600 mt-2">
                            {unpaidBills}
                        </p>
                    </div>

                </div>

                {/* Quick Actions */}

                <div className="bg-white rounded-xl shadow p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-5">
                        Quick Actions
                    </h2>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/patient/book-appointment"
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Book Appointment
                        </Link>

                        <Link
                            to="/patient/medical-history"
                            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            View Records
                        </Link>

                        <Link
                            to="/patient/billing"
                            className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700 transition"
                        >
                            Pay Bills
                        </Link>

                    </div>

                </div>

                {/* Appointments */}

                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        My Appointments
                    </h2>

                    <div className="space-y-5">

                        {myAppointments.map((appointment) => {

                            const doctor = doctors.find(
                                (d) => d.id === appointment.doctorId
                            );

                            return (

                                <div
                                    key={appointment.id}
                                    className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="text-xl font-semibold">
                                            {doctor.name}
                                        </h3>

                                        <p className="text-gray-600 mt-1">
                                            📅 {appointment.date}
                                        </p>

                                        <p className="text-gray-600">
                                            🕒 {appointment.time}
                                        </p>

                                    </div>

                                    <span
                                        className={`px-4 py-2 rounded-full font-medium capitalize ${getStatusColor(
                                            appointment.status
                                        )}`}
                                    >
                                        {appointment.status}
                                    </span>

                                </div>

                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PatientDashboard;