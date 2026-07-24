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
        }
    }
})

export const { addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;