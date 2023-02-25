import "./App.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { NoPage } from "./pages/NoPage";
import { Product } from "./pages/Product";

//"https://63f84b981dc21d5465bc6582.mockapi.io/shoes" products
// "https://63f84b981dc21d5465bc6582.mockapi.io/admins" admins

function App() {
  const [productArray, setProductArray] = useState([]);
  const [adminArray, setAdminArray] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null)
  const {isEditingProduct, setIsEditingProduct} = useState(false)

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
      setIsError(true);
    })
    .then((tasks) => {
      // Do something with the list of tasks
      setProductArray(tasks)

    })
    .catch(() => {
      // handle error
      
    });

    //get admins
    fetch("https://63f84b981dc21d5465bc6582.mockapi.io/admins", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
      setIsError(true);
    })
    .then((tasks) => {
      // Do something with the list of tasks
      setAdminArray(tasks)
      setIsLoading(false)




    })
    .catch(() => {
      // handle error
      
    });

    

  }, []);


  if(isError) {
    return  (
      <NoPage/>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <Home 
            productArray={productArray} 
            isAdmin={isAdmin} 
            currentAdmin={currentAdmin} 
            setCurrentAdmin={setCurrentAdmin}
            setIsAdmin={setIsAdmin}
            setCurrentProduct={setCurrentProduct}
          />}
        />
        <Route path="LogIn" element={ <LogIn adminArray={adminArray} setIsAdmin={setIsAdmin} setCurrentAdmin={setCurrentAdmin}/>}/>
        <Route path="Product" element={ 
          <Product
            currentProduct={currentProduct}
            setProductArray={setProductArray}
          />
        }/>
        <Route path="*" element={ <NoPage/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
