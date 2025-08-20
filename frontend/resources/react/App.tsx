import { useState, useEffect } from "react";
import { API_BASE_URL } from "./constants/apiConstants.ts";
import Chat from "./features/chat/Chat.tsx";

function App() {
  const apiBaseUrl = API_BASE_URL;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(apiBaseUrl)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, [apiBaseUrl]);

  return (
    <>
      <h2>
        APIとの疎通：
        {message}
      </h2>
      <Chat />
    </>
  );
}

export default App;
