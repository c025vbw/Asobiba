import { useEffect } from "react";
import { API_BASE_URL } from "./constants/apiConstants.ts";
import Header from "./components/Header.tsx";
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
      <Header title="AIチャット" subtitle="何でもお聞かせください" />
      <main className="w-full h-[calc(100vh-73px)]">
        <Chat />
      </main>
    </div>
  );
}

export default App;
