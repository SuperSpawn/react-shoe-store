import React,{useEffect, useState, useRef} from 'react'
import { Outlet, Link } from "react-router-dom";
import { ProductCard } from '../components/ProductCard';

import "../styles/Reset.css"
import '../styles/pages/Home.css'

export const Home = ({productArray, setProductArray, isAdmin, currentAdmin, setCurrentAdmin, setIsAdmin, setCurrentProduct, isEditingProduct, setIsEditingProduct}) => {

    const [counter, setCounter] = useState(0)
    const [filter, setFilter] = useState('')
    const searchbarRef = useRef(null)

    const logoutHandler = () => {
        localStorage.removeItem('current-admin');
        setIsAdmin(false);
        setCurrentAdmin(null);
    };
    const searchHandler = () => {
        console.log(searchbarRef.current.value)
        setFilter(searchbarRef.current.value);
    }

    useEffect(() => {
        if(!currentAdmin) {
            const admin = JSON.parse(localStorage.getItem('current-admin'))
            if(admin) {
                setCurrentAdmin(admin)
                setIsAdmin(true);
            }
        }
        else {
            setIsAdmin(true)
        }
    }, [])


    console.log(currentAdmin)

  return (
    <div className='Home-container'>
        {
            !isAdmin && (
            <div className='Login-link-container'>
                <Link className='Login-link' to="/LogIn">login</Link>
                <Outlet/>
            </div>
            )
        }
        {
            isAdmin && (
                <div className='Login-link-container'>
                    <p className='Login-admin-name'>Hello {currentAdmin.name},</p>
                    <button onClick={logoutHandler} className='Login-link Login-logout-button'>logout</button>
                </div>
            )
        }

        <div className='products-container'>
            <div className='navbar-container'>
                <div className='searchbar-container'>
                    <input ref={searchbarRef} className='searchbar-input' type='text'/>
                    <button onClick={searchHandler} className='searchbar-button'>Search</button>
                </div>
            </div>
            <div className='product-list-container'>
                {
                    productArray.map((product) => {
                        product.name = product.name.toLowerCase()
                        return product
                    }).filter((product, index) => {
                        return product.name.includes(filter)
                    }).map((product, index) => {
                        return <ProductCard 
                            key={index} 
                            data={product} 
                            isAdmin={isAdmin}
                            setCurrentProduct={setCurrentProduct}
                            productArray={productArray}
                            setProductArray={setProductArray}
                            counter={counter}
                            setCounter={setCounter}
                            isEditingProduct={isEditingProduct}
                            setIsEditingProduct={setIsEditingProduct}
                        />   
                    })
                }
            </div>
        </div>
    </div>
  )
}
