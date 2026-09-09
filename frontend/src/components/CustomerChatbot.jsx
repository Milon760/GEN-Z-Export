// import React, { useState, useRef, useEffect } from "react";
// import {
//   FiSend,
//   FiUser,
//   FiLoader,
//   FiTrash2,
//   FiPlus,
//   FiMessageSquare,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";
// import { BiBot } from "react-icons/bi";

// const CustomerChat = () => {
//   // ১. সকল চ্যাট সেশন লোড করা
//   const [sessions, setSessions] = useState(() => {
//     const saved = localStorage.getItem("ai_chat_sessions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ২. বর্তমানে একটিভ চ্যাট সেশনের ID
//   const [activeSessionId, setActiveSessionId] = useState(() => {
//     const saved = localStorage.getItem("ai_active_session_id");
//     return saved ? saved : null;
//   });

//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false); // মোবাইলের জন্য সাইডবার
//   const chatBottomRef = useRef(null);

//   // ব্রাউজারে ডেটা সিঙ্ক করা
//   useEffect(() => {
//     localStorage.setItem("ai_chat_sessions", JSON.stringify(sessions));
//   }, [sessions]);

//   useEffect(() => {
//     if (activeSessionId) {
//       localStorage.setItem("ai_active_session_id", activeSessionId);
//     } else {
//       localStorage.removeItem("ai_active_session_id");
//     }
//   }, [activeSessionId]);

//   // অটো স্ক্রোল
//   useEffect(() => {
//     chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [sessions, activeSessionId, loading]);

//   // বর্তমান একটিভ সেশনের মেসেজগুলো আলাদা করা
//   const currentSession = sessions.find((s) => s.id === activeSessionId);
//   const messages = currentSession ? currentSession.messages : [];

//   // নতুন চ্যাট তৈরি করার ফাংশন
//   const startNewChat = () => {
//     const newId = "session_" + Date.now();
//     const newSession = {
//       id: newId,
//       title: "New Chat",
//       messages: [],
//       createdAt: new Date().toLocaleDateString(),
//     };
//     setSessions((prev) => [newSession, ...prev]);
//     setActiveSessionId(newId);
//     setShowSidebar(false);
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim() || loading) return;

//     const userQuery = prompt.trim();
//     setPrompt("");

//     let currentId = activeSessionId;
//     let updatedSessions = [...sessions];

//     // যদি কোনো সেশন না থাকে, অটোমেটিক একটা তৈরি হবে
//     if (!currentId) {
//       currentId = "session_" + Date.now();
//       const newSession = {
//         id: currentId,
//         title:
//           userQuery.substring(0, 20) + (userQuery.length > 20 ? "..." : ""),
//         messages: [],
//         createdAt: new Date().toLocaleDateString(),
//       };
//       updatedSessions = [newSession, ...updatedSessions];
//       setSessions(updatedSessions);
//       setActiveSessionId(currentId);
//     }

//     const userMsg = { id: Date.now(), sender: "user", text: userQuery };
//     const aiMsgId = Date.now() + 1;
//     const initialAiMsg = { id: aiMsgId, sender: "ai", text: "" };

//     // স্টেট আপডেট ও মেসেজ পুশ
//     setSessions((prev) =>
//       prev.map((s) => {
//         if (s.id === currentId) {
//           // প্রথম মেসেজ হলে চ্যাটের টাইটেল আপডেট হবে
//           const title =
//             s.messages.length === 0
//               ? userQuery.substring(0, 25) +
//                 (userQuery.length > 25 ? "..." : "")
//               : s.title;
//           return {
//             ...s,
//             title,
//             messages: [...s.messages, userMsg, initialAiMsg],
//           };
//         }
//         return s;
//       }),
//     );

//     setLoading(true);

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/ai/customer/chat-stream",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ prompt: userQuery }),
//         },
//       );

//       if (!response.ok) throw new Error("Network error");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");
//       let buffer = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         buffer += decoder.decode(value, { stream: true });
//         const lines = buffer.split("\n\n");
//         buffer = lines.pop();

//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             const dataStr = line.replace("data: ", "").trim();
//             if (!dataStr) continue;

//             try {
//               const parsed = JSON.parse(dataStr);
//               if (parsed.text) {
//                 setSessions((prev) =>
//                   prev.map((s) =>
//                     s.id === currentId
//                       ? {
//                           ...s,
//                           messages: s.messages.map((msg) =>
//                             msg.id === aiMsgId
//                               ? { ...msg, text: msg.text + parsed.text }
//                               : msg,
//                           ),
//                         }
//                       : s,
//                   ),
//                 );
//               }
//             } catch (err) {
//               console.error("JSON parse error:", err);
//             }
//           }
//         }
//       }
//     } catch (err) {
//       setSessions((prev) =>
//         prev.map((s) =>
//           s.id === currentId
//             ? {
//                 ...s,
//                 messages: s.messages.map((msg) =>
//                   msg.id === aiMsgId
//                     ? {
//                         ...msg,
//                         text: "Error connecting to AI chat. Try again.",
//                       }
//                     : msg,
//                 ),
//               }
//             : s,
//         ),
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // নির্দিষ্ট একটি চ্যাট ডিলিট করা
//   const deleteSession = (id, e) => {
//     e.stopPropagation(); // চ্যাট সিলেক্ট হওয়া আটকানোর জন্য
//     if (window.confirm("Delete this chat history?")) {
//       const filtered = sessions.filter((s) => s.id !== id);
//       setSessions(filtered);
//       if (activeSessionId === id) {
//         setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
//       }
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto my-6 mt-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex h-[600px] transition-colors duration-300 font-sans relative">
//       {/* 📜 বামপাশের হিস্ট্রি সাইডবার */}
//       <div
//         className={`w-64 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full transition-all duration-300 md:relative absolute inset-y-0 left-0 z-20 ${
//           showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         }`}
//       >
//         {/* সাইডবার হেডার */}
//         <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
//           <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
//             Chat History
//           </span>
//           <button
//             onClick={() => setShowSidebar(false)}
//             className="md:hidden text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
//           >
//             <FiX size={18} />
//           </button>
//         </div>

//         {/* নতুন চ্যাট বাটন */}
//         <div className="p-3">
//           <button
//             onClick={startNewChat}
//             className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs font-bold transition-all cursor-pointer"
//           >
//             <FiPlus size={14} /> New Chat
//           </button>
//         </div>

//         {/* হিস্ট্রি লিস্ট */}
//         <div className="flex-1 overflow-y-auto px-2 space-y-1">
//           {sessions.length === 0 ? (
//             <p className="text-center text-[11px] text-neutral-400 mt-8">
//               No history yet
//             </p>
//           ) : (
//             sessions.map((s) => (
//               <div
//                 key={s.id}
//                 onClick={() => {
//                   setActiveSessionId(s.id);
//                   setShowSidebar(false);
//                 }}
//                 className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
//                   s.id === activeSessionId
//                     ? "bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20"
//                     : "hover:bg-neutral-200/50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
//                 }`}
//               >
//                 <div className="flex items-center gap-2 overflow-hidden">
//                   <FiMessageSquare size={14} className="flex-shrink-0" />
//                   <span className="text-xs font-semibold truncate pr-2">
//                     {s.title}
//                   </span>
//                 </div>
//                 <button
//                   onClick={(e) => deleteSession(s.id, e)}
//                   className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-500 transition-all rounded-md"
//                   title="Delete Chat"
//                 >
//                   <FiTrash2 size={13} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* 💬 মূল চ্যাট উইন্ডো (Right Window) */}
//       <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-900 relative">
//         {/* 🔝 হেডার */}
//         <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
//           <div className="flex items-center gap-3">
//             {/* মোবাইল মেনু বাটন */}
//             <button
//               onClick={() => setShowSidebar(true)}
//               className="md:hidden p-1 text-neutral-400 hover:text-white"
//             >
//               <FiMenu size={20} />
//             </button>
//             <div className="w-9 h-9 rounded-xl bg-[#C5A059] flex items-center justify-center text-neutral-950 font-bold shadow-md shadow-[#C5A059]/20">
//               <BiBot size={20} />
//             </div>
//             <div>
//               <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
//                 {currentSession ? currentSession.title : "Customer Support"}
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//               </h3>
//               <p className="text-[10px] text-neutral-400">
//                 Ask us anything 24/7
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* 💬 মেসেজ বডি */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 dark:bg-neutral-950/60">
//           {messages.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center p-4">
//               <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-400 mb-2">
//                 <BiBot size={24} />
//               </div>
//               <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
//                 How can we help you today?
//               </p>
//               <p className="text-[11px] text-neutral-400 mt-0.5">
//                 Type a message to start a new conversation.
//               </p>
//             </div>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex items-start gap-2 ${
//                   msg.sender === "user" ? "flex-row-reverse" : "flex-row"
//                 }`}
//               >
//                 {/* অ্যাভাটার */}
//                 <div
//                   className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
//                     msg.sender === "user"
//                       ? "bg-[#C5A059] text-neutral-950"
//                       : "bg-neutral-800 text-white border border-neutral-700"
//                   }`}
//                 >
//                   {msg.sender === "user" ? (
//                     <FiUser size={12} />
//                   ) : (
//                     <BiBot size={14} />
//                   )}
//                 </div>

//                 {/* মেসেজ বাবল */}
//                 <div
//                   className={`max-w-[78%] p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
//                     msg.sender === "user"
//                       ? "bg-[#C5A059] text-neutral-950 rounded-tr-none"
//                       : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-tl-none"
//                   }`}
//                 >
//                   <p className="whitespace-pre-wrap">
//                     {msg.text ||
//                       (loading && msg.sender === "ai" ? "Typing..." : "")}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//           <div ref={chatBottomRef} />
//         </div>

//         {/* 📥 ইনপুট বক্স */}
//         <form
//           onSubmit={handleSend}
//           className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2"
//         >
//           <input
//             type="text"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs border border-transparent focus:border-[#C5A059] focus:outline-none transition-all placeholder:text-neutral-400"
//           />

//           <button
//             type="submit"
//             disabled={loading || !prompt.trim()}
//             className="p-2.5 bg-neutral-950 dark:bg-[#C5A059] text-white dark:text-neutral-950 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
//           >
//             {loading ? (
//               <FiLoader className="animate-spin" size={15} />
//             ) : (
//               <FiSend size={15} />
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerChat;

// 2

import React, { useState, useRef, useEffect } from "react";
import {
  FiSend,
  FiUser,
  FiLoader,
  FiTrash2,
  FiPlus,
  FiMessageSquare,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { BiBot } from "react-icons/bi";

const CustomerChat = ({ isOpen, onClose }) => {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("ai_chat_sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSessionId, setActiveSessionId] = useState(() => {
    const saved = localStorage.getItem("ai_active_session_id");
    return saved ? saved : null;
  });

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("ai_chat_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem("ai_active_session_id", activeSessionId);
    } else {
      localStorage.removeItem("ai_active_session_id");
    }
  }, [activeSessionId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId, loading]);

  const currentSession = sessions.find((s) => s.id === activeSessionId);
  const messages = currentSession ? currentSession.messages : [];

  const startNewChat = () => {
    const newId = "session_" + Date.now();
    const newSession = {
      id: newId,
      title: "New Chat",
      messages: [],
      createdAt: new Date().toLocaleDateString(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
    setShowSidebar(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userQuery = prompt.trim();
    setPrompt("");

    let currentId = activeSessionId;
    let updatedSessions = [...sessions];

    if (!currentId) {
      currentId = "session_" + Date.now();
      const newSession = {
        id: currentId,
        title:
          userQuery.substring(0, 20) + (userQuery.length > 20 ? "..." : ""),
        messages: [],
        createdAt: new Date().toLocaleDateString(),
      };
      updatedSessions = [newSession, ...updatedSessions];
      setSessions(updatedSessions);
      setActiveSessionId(currentId);
    }

    const userMsg = { id: Date.now(), sender: "user", text: userQuery };
    const aiMsgId = Date.now() + 1;
    const initialAiMsg = { id: aiMsgId, sender: "ai", text: "" };

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentId) {
          const title =
            s.messages.length === 0
              ? userQuery.substring(0, 25) +
                (userQuery.length > 25 ? "..." : "")
              : s.title;
          return {
            ...s,
            title,
            messages: [...s.messages, userMsg, initialAiMsg],
          };
        }
        return s;
      }),
    );

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/customer/chat-stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userQuery }),
        },
      );

      if (!response.ok) throw new Error("Network error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.replace("data: ", "").trim();
            if (!dataStr) continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                setSessions((prev) =>
                  prev.map((s) =>
                    s.id === currentId
                      ? {
                          ...s,
                          messages: s.messages.map((msg) =>
                            msg.id === aiMsgId
                              ? { ...msg, text: msg.text + parsed.text }
                              : msg,
                          ),
                        }
                      : s,
                  ),
                );
              }
            } catch (err) {
              console.error("JSON parse error:", err);
            }
          }
        }
      }
    } catch (err) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === currentId
            ? {
                ...s,
                messages: s.messages.map((msg) =>
                  msg.id === aiMsgId
                    ? {
                        ...msg,
                        text: "Error connecting to AI chat. Try again.",
                      }
                    : msg,
                ),
              }
            : s,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this chat history?")) {
      const filtered = sessions.filter((s) => s.id !== id);
      setSessions(filtered);
      if (activeSessionId === id) {
        setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      {/* মোডাল কন্টেইনার */}
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex h-[600px] transition-colors duration-300 font-sans relative">
        {/* 📜 বামপাশের হিস্ট্রি সাইডবার */}
        <div
          className={`w-64 bg-neutral-50 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full transition-all duration-300 md:relative absolute inset-y-0 left-0 z-20 ${
            showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Chat History
            </span>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
            >
              <FiX size={18} />
            </button>
          </div>

          <div className="p-3">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs font-bold transition-all cursor-pointer"
            >
              <FiPlus size={14} /> New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 space-y-1">
            {sessions.length === 0 ? (
              <p className="text-center text-[11px] text-neutral-400 mt-8">
                No history yet
              </p>
            ) : (
              sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setActiveSessionId(s.id);
                    setShowSidebar(false);
                  }}
                  className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    s.id === activeSessionId
                      ? "bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20"
                      : "hover:bg-neutral-200/50 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FiMessageSquare size={14} className="flex-shrink-0" />
                    <span className="text-xs font-semibold truncate pr-2">
                      {s.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => deleteSession(s.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-500 transition-all rounded-md"
                    title="Delete Chat"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 💬 মূল চ্যাট উইন্ডো */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-900 relative">
          {/* হেডার */}
          <div className="p-4 bg-white dark:bg-neutral-900 text-black dark:text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden p-1 text-neutral-400 hover:text-white"
              >
                <FiMenu size={20} />
              </button>
              <div className="w-9 h-9 rounded-xl bg-[#C5A059] flex items-center justify-center text-neutral-950 font-bold shadow-md shadow-[#C5A059]/20">
                <BiBot size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  {currentSession ? currentSession.title : "Customer Support"}
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <p className="text-[10px] text-neutral-400">
                  Ask us anything 24/7
                </p>
              </div>
            </div>

            {/* ❌ মোডাল বন্ধ করার বাটন */}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* মেসেজ বডি */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-50 dark:bg-neutral-950/60">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800/80 flex items-center justify-center text-neutral-400 mb-2">
                  <BiBot size={24} />
                </div>
                <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                  How can we help you today?
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Type a message to start a new conversation.
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
                      msg.sender === "user"
                        ? "bg-[#C5A059] text-neutral-950"
                        : "bg-neutral-800 text-white border border-neutral-700"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <FiUser size={12} />
                    ) : (
                      <BiBot size={14} />
                    )}
                  </div>

                  <div
                    className={`max-w-[78%] p-3 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                      msg.sender === "user"
                        ? "bg-[#C5A059] text-neutral-950 rounded-tr-none"
                        : "bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.text ||
                        (loading && msg.sender === "ai" ? "Typing..." : "")}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* ইনপুট বক্স */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-xl px-3.5 py-2.5 text-xs border border-transparent focus:border-[#C5A059] focus:outline-none transition-all placeholder:text-neutral-400"
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-2.5 bg-neutral-950 dark:bg-[#C5A059] text-white dark:text-neutral-950 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              {loading ? (
                <FiLoader className="animate-spin" size={15} />
              ) : (
                <FiSend size={15} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerChat;
