import { useState, useEffect } from "react";
import { API_URL } from "./constants/apiConstants.ts";
import Chat from "./components/Chat.tsx";

function App() {
  const apiUrl = API_URL;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, [apiUrl]);

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
