interface ChatMessageProps {
  message: string;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
      <p className="text-gray-800 dark:text-gray-200">{message}</p>
    </div>
  );
};

export default ChatMessage;
