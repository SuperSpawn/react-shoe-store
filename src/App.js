import "./App.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    fetch("https://63f84b981dc21d5465bc6582.mockapi.io/shoes", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
        throw new Error("cant connect");
      })
      .then((tasks) => {
        // Do something with the list of tasks
        setProductArray(tasks)
      })
      .catch((error) => {
        // handle error
        console.error(error.message);
      });
  }, []);

  return <div>Hi</div>;
}

export default App;
