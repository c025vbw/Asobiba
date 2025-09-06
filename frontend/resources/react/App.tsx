import { useEffect } from "react";
import { API_BASE_URL } from "./constants/apiConstants.ts";
import Chat from "./features/chat/Chat.tsx";

function App() {
  const apiBaseUrl = API_BASE_URL;

  useEffect(() => {
    fetch(apiBaseUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, [apiBaseUrl]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="w-full h-screen">
        <Chat />
      </main>
    </div>
  );
}

export default App;
