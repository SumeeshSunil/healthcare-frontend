import { createSlice } from "@reduxjs/toolkit";
import appointmentsData from "../../data/dummyAppointments.json";

const appointmentSlice = createSlice({
    name: "appointment",
    initialState: {
        appointments: appointmentsData,
    },
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
        },
        cancelAppointment: (state, action) => {
            const appointment = state.appointments.find((a) => a.id === action.payload);
            if (appointment) {
                appointment.status = "cancelled";
            }
        },
        approveAppointment: (state, action) => {
            const appointment = state.appointments.find((a) => a.id === action.payload);
            if (appointment) {
                appointment.status = "confirmed";
            }
        },
        rejectAppointment: (state, action) => {
            const appointment = state.appointments.find((a) => a.id === action.payload);
            if (appointment) {
                appointment.status = "cancelled";
            }
        },
        updateAppointmentStatus: (state, action) => {
            const { id, status } = action.payload;
            const appointment = state.appointments.find((a) => a.id === id);
            if (appointment) {
                appointment.status = status;
            }
        }
    }
});

export const {
    addAppointment,
    cancelAppointment,
    approveAppointment,
    rejectAppointment,
    updateAppointmentStatus
} = appointmentSlice.actions;

export default appointmentSlice.reducer;