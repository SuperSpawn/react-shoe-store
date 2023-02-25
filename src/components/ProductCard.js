import React from 'react'
import { useNavigate } from "react-router-dom";

import '../styles/Reset.css'
import '../styles/components/ProductCard.css'

export const ProductCard = ({data, isAdmin, setCurrentProduct}) => {

  let navigate = useNavigate()

  const addToCartHandler = () => {
    navigate("/Cart");
    //404
  }
  const productHandler = () => {
    setCurrentProduct(data)
    navigate("/Product");
  }


  return (
    <div  className='ProductCard-container'>
        <img src={data.avatar} alt="product that is good"/>
        <h4 className='ProductCard-product-name'>{data.name}</h4>
        <h6 className='ProductCard-product-description'>{data.description}</h6>
        <div>
          { (data.stock !== 0) ? (<h5 className='ProductCard-product-in-stock'>In stock</h5>) : (<h5 className='ProductCard-product-not-in-stock'>Not in stock</h5>) }
          with { data.stock } in inventory.
        </div>
        <h5 className='ProductCard-product-price'>{data.price + "$"}</h5>
        <button onClick={addToCartHandler} className='ProductCard-button'>Add to cart</button>
        { isAdmin && <button className='ProductCard-button'>Edit product</button> }
        { isAdmin && <button className='ProductCard-button'>Delete product</button> }
    </div>
  )
}
