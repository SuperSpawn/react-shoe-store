import "./App.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { NoPage } from "./pages/NoPage";
import { Product } from "./pages/Product";

function App() {
  const [productArray, setProductArray] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home productArray={productArray} isAdmin={isAdmin}/> }/>
        <Route path="LogIn" element={ <LogIn/>}/>
        <Route path="Product" element={ <Product/> }/>
        <Route path="*" element={ <NoPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
