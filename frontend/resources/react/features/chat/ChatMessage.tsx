import { Message } from "../../types/types";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      data-testid={`message-${message.id}`}
    >
      <div
        className={`max-w-[80%] flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 ${isUser ? "space-x-reverse" : ""}`}
      >
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
          }`}
        >
          {isUser ? "あ" : "AI"}
        </div>

        {/* Message content */}
        <div className="flex flex-col space-y-1">
          <div
            className={`text-xs text-gray-500 ${isUser ? "text-right" : "text-left"}`}
          >
            {isUser ? "あなた" : "AI"}
          </div>
          <div
            className={`rounded-2xl px-4 py-2 max-w-md break-words ${
              isUser
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <div
            className={`text-xs text-gray-400 ${isUser ? "text-right" : "text-left"}`}
          >
            {message.timestamp.toLocaleTimeString("ja-JP", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
