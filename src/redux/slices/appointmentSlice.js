import { createSlice } from "@reduxjs/toolkit";
import appointmentsData from "../../data/dummyAppointments.json";

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointments: appointmentsData,
    },
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push(action.payload)
        },
        cancelAppointment: (state, action) => {
            const appointment = state.appointments.find((a) => a.id === action.payload);
            if (appointment) {
                appointment.status = "cancelled";
            }
        }
    }
})

export const { addAppointment, cancelAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;