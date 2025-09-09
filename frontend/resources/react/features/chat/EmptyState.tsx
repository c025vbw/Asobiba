const EmptyState = () => {
  return (
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
  );
};

export default EmptyState;