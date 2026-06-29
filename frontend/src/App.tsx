import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import StoryDetail from "./pages/StoryDetail";
import Reading from "./pages/Reading";
import Write from "./pages/Write";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Chatbot components
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import { mosseaInfo } from "./mosseaInfo";

const queryClient = new QueryClient();

type ChatMessageType = {
  role: string;
  text: string;
  hideInChat?: boolean;
  isError?: boolean;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

const App = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    {
      hideInChat: true,
      role: "model",
      text: mosseaInfo,
    },
  ]);

  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const updateHistory = (text: string, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error: any) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
            <Route path="/story/:id" element={<ProtectedRoute><StoryDetail /></ProtectedRoute>} />
            <Route path="/read/:id/:chapter?" element={<ProtectedRoute><Reading /></ProtectedRoute>} />
            <Route path="/write" element={<ProtectedRoute><Write /></ProtectedRoute>} />
            <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/profile/:username?" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Chatbot Popup */}
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
          <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
            <span className="material-symbols-rounded">mode_comment</span>
            <span className="material-symbols-rounded">close</span>
          </button>

          <div className="chatbot-popup">
            {/* Header */}
            <div className="chat-header">
              <div className="header-info">
                <ChatbotIcon />
                <h2 className="logo-text">Mosséa Chatbot</h2>
              </div>
              <button
                onClick={() => setShowChatbot((prev) => !prev)}
                className="material-symbols-rounded"
              >
                keyboard_arrow_down
              </button>
            </div>

            {/* Chat Body */}
            <div ref={chatBodyRef} className="chat-body">
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">
                  Hi👋🏻..<br />This is Mosséa AI with you
                </p>
              </div>

              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </div>

            {/* Chat Footer */}
            <div className="chat-footer">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
