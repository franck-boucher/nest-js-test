import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const newMeeting = () => {
    const title = "Meeting 2";
    const from = "2021-09-01T10:00:00.000Z";
    const to = "2021-09-01T11:00:00.000Z";

    fetch("/api/meetings", {
      method: "POST",
      body: JSON.stringify({ title, from, to }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={newMeeting}>new meeting</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
