import { createSlice } from "@reduxjs/toolkit";
import patientsData from "../../data/dummyPatients.json";

const patientSlice = createSlice({
    name: 'patient',
    initialState: {
        patients: patientsData,
    },
    reducers: {
        updatePatientProfile: (state, action) => {
            const index = state.patients.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.patients[index] = { ...state.patients[index], ...action.payload };
            }
        }
    }
});

export const { updatePatientProfile } = patientSlice.actions;
export default patientSlice.reducer;
