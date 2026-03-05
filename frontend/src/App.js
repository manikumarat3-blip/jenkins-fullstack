import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Fullstack DevOps Project</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;



