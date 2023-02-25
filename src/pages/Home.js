import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { ProductCard } from '../components/ProductCard';


export const Home = ({productArray, isAdmin}) => {
  return (
    <div className='Home-container'>
        <div className='Login-link-container'>
            <Link to="/LogIn">login</Link>
            <Outlet/>
        </div>
        <div className='products-container'>
            <div className='navbar=container'>
                <div className='searchbar-container'>
                    <input type='text'/>
                    <button></button>
                </div>
            </div>
            <div className='product-list-container'>
                {
                    productArray.map((product, index) => {
                        return <ProductCard key={index} data={product} isAdmin={isAdmin}/>   
                    })
                }
            </div>
        </div>
    </div>
  )
}
