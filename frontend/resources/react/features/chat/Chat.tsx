import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";
import type { ChatResponse, Message } from "../../types/types";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const messageIdCounter = useRef(0);

  // const generateId = () => {
  //   messageIdCounter.current += 1;
  //   return `msg-${messageIdCounter.current}`;
  // };

  const scrollToBottom = () => {
    if (
      messagesEndRef.current &&
      typeof messagesEndRef.current.scrollIntoView === "function"
    ) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageToAPI = async (userMessage: string) => {
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to get response from API");
      // }

      const data: ChatResponse = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.documents.map((doc) => doc.content).join("\n\n"),
        documents: data.documents,
        timestamp: new Date(),
      };

      setMessages((prevState) => [...prevState, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // フォールバック応答
      // const fallbackMessage: Message = {
      //   id: (Date.now() + 1).toString(),
      //   content:
      //     "申し訳ございません。現在、応答できません。しばらく後でお試しください。",
      //   role: "ai",
      //   timestamp: new Date(),
      // };

      //   setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // API経由でAI応答を取得
    await sendMessageToAPI(content.trim());
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-800">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[80%] flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
                    AI
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Chat;
