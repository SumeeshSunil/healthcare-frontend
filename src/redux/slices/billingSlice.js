import { createSlice } from "@reduxjs/toolkit";
import billsData from "../../data/dummyBills.json";

const billingSlice = createSlice({
    name: 'billing',
    initialState: {
        bills: billsData,
    },
    reducers: {
        addBill: (state, action) => {
            state.bills.push(action.payload);
        },
        payBill: (state, action) => {
            const { billId, paymentMethod } = action.payload;
            const bill = state.bills.find((b) => b.id === billId);
            if (bill) {
                bill.status = "paid";
                bill.paymentMethod = paymentMethod;
                bill.paidOn = new Date().toISOString().split("T")[0];
            }
        }
    }
});

export const { addBill, payBill } = billingSlice.actions;
export default billingSlice.reducer;
