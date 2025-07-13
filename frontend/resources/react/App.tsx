import { useState, useEffect } from "react";
import { API_URL } from "./constants/apiConstants.ts";

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
      <h1>画面出力テスト</h1>
      <p>{message}</p>
    </>
  );
}

export default App;
