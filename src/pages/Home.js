import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { ProductCard } from '../components/ProductCard';

import "../styles/Reset.css"
import '../styles/pages/Home.css'

export const Home = ({productArray, isAdmin, currentAdmin, setCurrentAdmin, setIsAdmin, setCurrentProduct}) => {

    const logoutHandler = () => {
        setIsAdmin(false);
        setCurrentAdmin(null);
    };

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
                    <input className='searchbar-input' type='text'/>
                    <button className='searchbar-button'>Search</button>
                </div>
            </div>
            <div className='product-list-container'>
                {
                    productArray.map((product, index) => {
                        return <ProductCard 
                            key={index} 
                            data={product} 
                            isAdmin={isAdmin}
                            setCurrentProduct={setCurrentProduct}
                        />   
                    })
                }
            </div>
        </div>
    </div>
  )
}
