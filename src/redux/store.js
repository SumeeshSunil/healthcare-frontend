import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import appointmentReducer from "./slices/appointmentSlice";
import billingReducer from "./slices/billingSlice";
import recordsReducer from "./slices/recordsSlice";
import patientReducer from "./slices/patientSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appointment: appointmentReducer,
        billing: billingReducer,
        records: recordsReducer,
        patient: patientReducer,
    }
})