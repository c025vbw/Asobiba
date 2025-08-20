import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-96 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            メッセージがありません。質問してみましょう。
          </p>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
