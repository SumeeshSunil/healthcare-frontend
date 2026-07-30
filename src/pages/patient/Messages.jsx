import { useState } from "react";
import { useSelector } from "react-redux";
import dummyDoctors from "../../data/dummyDoctors.json";
import dummyPatients from "../../data/dummyPatients.json";
import Layout from "../../components/Layout";

function Messages() {
    const auth = useSelector((state) => state.auth);
    const userRole = auth?.user?.role || "patient";

    const contacts = userRole === "doctor"
        ? dummyPatients.map((p) => ({
              id: p.id,
              name: p.name,
              subtext: `Age: ${p.age} • ${p.gender} • EHR #${p.id}`,
              avatar: p.name.charAt(0),
              chatHistory: [
                  { sender: "patient", text: "Hello Doctor, I wanted to follow up on my recent consultation.", time: "09:30 AM" },
                  { sender: "doctor", text: `Hello ${p.name}! How are you feeling today? Any changes in symptoms?`, time: "09:45 AM" }
              ]
          }))
        : dummyDoctors.map((d) => ({
              id: d.id,
              name: d.name,
              subtext: `${d.specialization} (${d.location})`,
              avatar: d.name.replace(/^Dr\.?\s*/i, "").charAt(0),
              chatHistory: [
                  { sender: "doctor", text: `Hello! I am ${d.name}. How can I assist you with your health query today?`, time: "10:15 AM" },
                  { sender: "patient", text: "Hi Doctor! Checking in regarding my prescription and follow-up date.", time: "10:22 AM" }
              ]
          }));

    const [activeContactId, setActiveContactId] = useState(contacts[0]?.id || 1);
    const [inputMessage, setInputMessage] = useState("");

    const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        activeContact.chatHistory.push({
            sender: userRole,
            text: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        setInputMessage("");
    };

    return (
        <Layout>
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
                    Clinical Messaging
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    {userRole === "doctor" ? "Patient Consultation Messages" : "Doctor Consultation Chat"}
                </h1>
                <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed">
                    Direct secure messaging channel between attending medical specialists and patients in Kerala.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 overflow-hidden min-h-[500px]">
                <div className="border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
                    <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider px-2">
                        {userRole === "doctor" ? "Registered Patients" : "Specialist Doctors"}
                    </h3>
                    <div className="space-y-2">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setActiveContactId(contact.id)}
                                className={`p-3 rounded-2xl cursor-pointer transition flex items-center gap-3 ${
                                    activeContactId === contact.id
                                        ? "bg-white border border-teal-300 shadow-sm"
                                        : "hover:bg-white/80 border border-transparent"
                                }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center shrink-0">
                                    {contact.avatar}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-slate-900 text-xs truncate">
                                        {contact.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                        {contact.subtext}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col h-[500px] justify-between bg-white">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/30">
                        <div className="w-9 h-9 rounded-xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center shrink-0">
                            {activeContact.avatar}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">{activeContact.name}</h4>
                            <p className="text-[10px] text-teal-600 font-semibold">{activeContact.subtext}</p>
                        </div>
                    </div>

                    <div className="p-4 space-y-4 overflow-y-auto flex-1 bg-slate-50/20">
                        {activeContact.chatHistory.map((msg, index) => {
                            const isMe = msg.sender === userRole;
                            return (
                                <div
                                    key={index}
                                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-xs sm:max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                                            isMe
                                                ? "bg-teal-600 text-white rounded-br-none shadow-sm"
                                                : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm"
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                        <span
                                            className={`block text-[9px] mt-1 text-right ${
                                                isMe ? "text-teal-200" : "text-slate-400"
                                            }`}
                                        >
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition text-slate-800"
                        />
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition shadow"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Messages;
