import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import DemoHome from "../pages/DemoHome";
import Register from "../pages/auth/Register";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DemoHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;