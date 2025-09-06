import { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import { Message } from "../../types/types";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);

  const generateId = () => {
    messageIdCounter.current += 1;
    return `msg-${messageIdCounter.current}`;
  };

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

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);

    // シミュレートされたAI応答の遅延
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000),
    );

    // シンプルなAI応答生成
    const responses = [
      `ありがとうございます、「${userMessage}」について理解しました。`,
      "それは興味深いご質問ですね。",
      "もう少し詳しく教えていただけますか？",
      "なるほど、そのような考えをお持ちなのですね。",
      "参考になるお話をありがとうございます。",
    ];

    const aiResponse = responses[Math.floor(Math.random() * responses.length)];

    const aiMessage: Message = {
      id: generateId(),
      content: aiResponse,
      role: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // AI応答をシミュレート
    await simulateAIResponse(content.trim());
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          AIチャット
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          何でもお聞かせください
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
              新しい会話を始めましょう
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              何でもお聞かせください。AIがサポートいたします。
            </p>
          </div>
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
