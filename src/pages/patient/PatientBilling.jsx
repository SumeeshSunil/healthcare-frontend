import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { payBill } from "../../redux/slices/billingSlice";

import patients from "../../data/dummyPatients.json";
import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function PatientBilling() {
    const [activeTab, setActiveTab] = useState("all");
    const [selectedBill, setSelectedBill] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const auth = useSelector((state) => state.auth);
    const bills = useSelector((state) => state.billing?.bills || []);
    const dispatch = useDispatch();

    const currentUserId = auth.user ? auth.user.id : 4;

    const patientProfile = patients.find(
        (p) => p.userId === currentUserId
    ) || patients[0];

    const myBills = bills.filter(
        (b) => b.patientId === patientProfile.id
    );

    const filteredBills = myBills.filter((b) => {
        if (activeTab === "all") return true;
        return b.status === activeTab;
    });

    const totalBilled = myBills.reduce((acc, b) => acc + b.totalAmount, 0);

    const totalPaid = myBills
        .filter((b) => b.status === "paid")
        .reduce((acc, b) => acc + b.totalAmount, 0);

    const unpaidBalance = myBills
        .filter((b) => b.status === "unpaid")
        .reduce((acc, b) => acc + b.totalAmount, 0);

    const handlePayBill = () => {
        if (!selectedBill) return;

        dispatch(
            payBill({
                billId: selectedBill.id,
                paymentMethod: paymentMethod,
            })
        );

        alert(`Payment of ₹${selectedBill.totalAmount} processed via ${paymentMethod}!`);
        setSelectedBill(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 max-w-6xl p-8 space-y-8">

                    {/* Page Header */}

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">

                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Billing Statements & Payments
                        </h1>

                        <p className="text-xs text-slate-500 mt-1">
                            Review detailed invoices, insurance claim status, and make online payments.
                        </p>

                    </div>

                    {/* Financial Summary */}

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">

                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Total Invoiced
                            </p>

                            <p className="text-3xl font-extrabold text-slate-900 mt-2">
                                ₹{totalBilled}
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">

                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Total Cleared
                            </p>

                            <p className="text-3xl font-extrabold text-emerald-600 mt-2">
                                ₹{totalPaid}
                            </p>

                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">

                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Outstanding Balance
                            </p>

                            <p className="text-3xl font-extrabold text-rose-600 mt-2">
                                ₹{unpaidBalance}
                            </p>

                        </div>

                    </div>

                    {/* Tabs */}

                    <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm w-fit">

                        {["all", "unpaid", "paid"].map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
                                    activeTab === tab
                                        ? "bg-slate-900 text-white shadow"
                                        : "text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {tab}
                            </button>

                        ))}

                    </div>

                    {/* Invoices List */}

                    {filteredBills.length === 0 ? (

                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">

                            <div className="text-4xl mb-3">💳</div>

                            <h3 className="text-lg font-bold text-slate-800">
                                No statements found
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                You have no {activeTab !== "all" ? activeTab : ""} statements.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-6">

                            {filteredBills.map((bill) => {

                                const doctor = doctors.find((d) => d.id === bill.doctorId) || {
                                    name: "Consultant Physician",
                                };

                                return (

                                    <div
                                        key={bill.id}
                                        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4"
                                    >

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">

                                            <div>

                                                <div className="flex items-center gap-3">

                                                    <h3 className="text-lg font-bold text-slate-900">
                                                        Statement #{bill.id}
                                                    </h3>

                                                    <span
                                                        className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase border ${
                                                            bill.status === "paid"
                                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                                : "bg-rose-50 text-rose-700 border-rose-200"
                                                        }`}
                                                    >
                                                        {bill.status}
                                                    </span>

                                                </div>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    Physician: <span className="font-bold text-slate-800">{doctor.name}</span> | Date: {bill.date}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <p className="text-xs text-slate-400 font-semibold uppercase">Total Amount</p>

                                                <p className="text-2xl font-extrabold text-slate-900">
                                                    ₹{bill.totalAmount}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Charges */}

                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">

                                            <h4 className="font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                Clinical Itemized Charges
                                            </h4>

                                            <div className="space-y-1.5">

                                                {bill.items.map((item, idx) => (

                                                    <div key={idx} className="flex justify-between text-slate-700 font-medium">

                                                        <span>{item.description}</span>

                                                        <span className="font-bold text-slate-900">₹{item.amount}</span>

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                        {/* Insurance details */}

                                        {bill.insurance && (

                                            <div className="bg-sky-50/80 border border-sky-200/80 p-3.5 rounded-2xl text-xs flex justify-between items-center text-sky-900">

                                                <div>

                                                    <span className="font-bold">Insurance Provider ({bill.insurance.provider}):</span> Claim Status:{" "}

                                                    <span className="capitalize font-bold text-sky-700">{bill.insurance.claimStatus}</span>

                                                </div>

                                                <span className="font-bold">Covered: ₹{bill.insurance.coveredAmount}</span>

                                            </div>

                                        )}

                                        {/* Action */}

                                        <div className="flex justify-between items-center pt-2">

                                            <div className="text-xs text-slate-400">

                                                {bill.status === "paid" ? (
                                                    <p>Settled on {bill.paidOn} via {bill.paymentMethod}</p>
                                                ) : (
                                                    <p>Due upon receipt</p>
                                                )}

                                            </div>

                                            {bill.status === "unpaid" && (

                                                <button
                                                    onClick={() => setSelectedBill(bill)}
                                                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow transition"
                                                >
                                                    Pay ₹{bill.totalAmount} Online
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                    )}

                    {/* Payment Modal */}

                    {selectedBill && (

                        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

                            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative">

                                <button
                                    onClick={() => setSelectedBill(null)}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-extrabold text-slate-900 mb-1">
                                    Online Payment Checkout
                                </h2>

                                <p className="text-xs text-slate-500 mb-6">
                                    Statement #{selectedBill.id} | Amount: <span className="font-bold text-slate-900 text-sm">₹{selectedBill.totalAmount}</span>
                                </p>

                                <div className="space-y-3 mb-6">

                                    {["UPI", "Credit / Debit Card", "Net Banking"].map((method) => (

                                        <div
                                            key={method}
                                            onClick={() => setPaymentMethod(method)}
                                            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between text-xs font-bold transition ${
                                                paymentMethod === method
                                                    ? "border-teal-500 bg-teal-50/50 text-teal-900"
                                                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                                            }`}
                                        >

                                            <span>{method}</span>

                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={paymentMethod === method}
                                                onChange={() => setPaymentMethod(method)}
                                                className="accent-teal-600"
                                            />

                                        </div>

                                    ))}

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => setSelectedBill(null)}
                                        className="w-1/2 bg-slate-200 text-slate-800 py-3 rounded-xl text-xs font-bold hover:bg-slate-300 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={handlePayBill}
                                        className="w-1/2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-xs font-bold transition shadow"
                                    >
                                        Complete Payment
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </main>

            </div>
        </div>
    );
}

export default PatientBilling;
