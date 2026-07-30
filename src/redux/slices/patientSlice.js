import { createSlice } from "@reduxjs/toolkit";
import patientsData from "../../data/dummyPatients.json";

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patients: patientsData,
    },
    reducers: {
        addPatient: (state, action) => {
            const newPatient = action.payload;
            const exists = state.patients.find((p) => p.userId === newPatient.userId || p.email === newPatient.email);
            if (!exists) {
                state.patients.push(newPatient);
            }
        },
        updatePatientProfile: (state, action) => {
            const index = state.patients.findIndex((p) => p.id === action.payload.id || p.userId === action.payload.userId);
            if (index !== -1) {
                state.patients[index] = { ...state.patients[index], ...action.payload };
            }
        }
    }
});

export const { addPatient, updatePatientProfile } = patientSlice.actions;
export default patientSlice.reducer;
