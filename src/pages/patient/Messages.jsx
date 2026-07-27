import { useState } from "react";
import { useSelector } from "react-redux";

import doctors from "../../data/dummyDoctors.json";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Messages() {
    const auth = useSelector((state) => state.auth);

    const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
    const [messageInput, setMessageInput] = useState("");
    const [chatHistory, setChatHistory] = useState({
        1: [
            { sender: "doctor", text: "Hello Kannan, how are you feeling after taking Amlodipine?", time: "10:00 AM" },
            { sender: "patient", text: "Hi Dr. Ananya, my blood pressure is steady now, no dizziness.", time: "10:05 AM" },
            { sender: "doctor", text: "Great to hear! Continue the dosage for 30 days as prescribed.", time: "10:07 AM" }
        ],
        2: [
            { sender: "doctor", text: "Please make sure to apply hydrocortisone cream twice daily.", time: "Yesterday" }
        ]
    });

    const activeMessages = chatHistory[selectedDoctor.id] || [];

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!messageInput.trim()) return;

        const newMessage = {
            sender: "patient",
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatHistory({
            ...chatHistory,
            [selectedDoctor.id]: [...activeMessages, newMessage]
        });

        setMessageInput("");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <Navbar />

            <div className="flex flex-1">

                <Sidebar />

                <main className="flex-1 max-w-6xl p-8 flex flex-col">

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row flex-1 overflow-hidden min-h-[600px]">

                        {/* Physician selection panel */}

                        <div className="w-full md:w-80 border-r border-slate-200/80 bg-slate-50/50 flex flex-col">

                            <div className="p-5 border-b border-slate-200 bg-white">

                                <h2 className="text-lg font-extrabold text-slate-900">
                                    Clinical Chat
                                </h2>

                                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                                    Direct physician consultations
                                </p>

                            </div>

                            <div className="overflow-y-auto flex-1 divide-y divide-slate-100">

                                {doctors.map((doctor) => {

                                    const isSelected = selectedDoctor.id === doctor.id;

                                    return (

                                        <div
                                            key={doctor.id}
                                            onClick={() => setSelectedDoctor(doctor)}
                                            className={`p-4 cursor-pointer flex items-center gap-3 transition ${
                                                isSelected
                                                    ? "bg-teal-50/80 border-l-4 border-teal-600"
                                                    : "hover:bg-slate-100/60"
                                            }`}
                                        >

                                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-300 font-extrabold flex items-center justify-center text-sm shrink-0">
                                                {doctor.name.replace(/^Dr\.?\s*/i, "").charAt(0)}
                                            </div>

                                            <div className="overflow-hidden">

                                                <h3 className="font-bold text-xs text-slate-900 truncate">
                                                    {doctor.name}
                                                </h3>

                                                <p className="text-[11px] text-teal-600 font-semibold truncate mt-0.5">
                                                    {doctor.specialization}
                                                </p>

                                            </div>

                                        </div>

                                    );
                                })}

                            </div>

                        </div>

                        {/* Chat Box */}

                        <div className="flex-1 flex flex-col bg-white">

                            <div className="p-4 px-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">

                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-300 font-extrabold flex items-center justify-center text-sm">
                                    {selectedDoctor.name.replace(/^Dr\.?\s*/i, "").charAt(0)}
                                </div>

                                <div>

                                    <h3 className="font-bold text-sm text-slate-900">
                                        {selectedDoctor.name}
                                    </h3>

                                    <p className="text-[11px] text-teal-600 font-semibold">
                                        {selectedDoctor.specialization} • Online
                                    </p>

                                </div>

                            </div>

                            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">

                                {activeMessages.length === 0 ? (

                                    <div className="text-center text-slate-400 text-xs py-12">
                                        No messages found. Send your query below.
                                    </div>

                                ) : (

                                    activeMessages.map((msg, index) => {

                                        const isPatient = msg.sender === "patient";

                                        return (

                                            <div
                                                key={index}
                                                className={`flex ${isPatient ? "justify-end" : "justify-start"}`}
                                            >

                                                <div
                                                    className={`max-w-md p-4 rounded-2xl shadow-sm text-xs ${
                                                        isPatient
                                                            ? "bg-slate-900 text-white rounded-br-none"
                                                            : "bg-white text-slate-800 border border-slate-200 rounded-bl-none font-medium"
                                                    }`}
                                                >

                                                    <p className="leading-relaxed">{msg.text}</p>

                                                    <span
                                                        className={`text-[10px] mt-1.5 block text-right font-medium ${
                                                            isPatient ? "text-teal-300" : "text-slate-400"
                                                        }`}
                                                    >
                                                        {msg.time}
                                                    </span>

                                                </div>

                                            </div>

                                        );
                                    })

                                )}

                            </div>

                            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 bg-white flex gap-3">

                                <input
                                    type="text"
                                    placeholder={`Send clinical message to ${selectedDoctor.name}...`}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-semibold"
                                />

                                <button
                                    type="submit"
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-xs transition shadow"
                                >
                                    Send
                                </button>

                            </form>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Messages;
