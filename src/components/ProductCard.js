import React from 'react'
import { useNavigate } from "react-router-dom";

import '../styles/Reset.css'
import '../styles/components/ProductCard.css'

export const ProductCard = ({data, isAdmin, setCurrentProduct, productArray,setProductArray, counter, setCounter, isEditingProduct, setIsEditingProduct}) => {

  let navigate = useNavigate()


  const addToCartHandler = () => {
    navigate("/Cart");
    //404
  }
  const productHandler = () => {
    localStorage.setItem("current-product", JSON.stringify(data))
    setCurrentProduct(data)
    navigate("/Product");
  }
  const editHandler = () => {
    setIsEditingProduct(true)
    productHandler()
  }
  const deleteHandler = () => {
    for(let i in productArray) {
      if(productArray[i].id === data.id) {

        fetch(`https://63f84b981dc21d5465bc6582.mockapi.io/shoes/${data.id}`, {
          method: 'DELETE',
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          // handle error
        }).then(task => {
          // Do something with deleted task
          setCurrentProduct(null)
          localStorage.removeItem('current-product')
          setCounter(counter + 1)
          productArray.splice(i, 1)
          setProductArray(productArray)
        }).catch(error => {
            // handle error
        })
      }
    }
  }


  return (
    <div className='ProductCard-container'>
        <div onClick={productHandler} className='ProductCard-clickable'>
          <img src={data.avatar} alt="product that is good"/>
          <h4 className='ProductCard-product-name'>{data.name}</h4>
          <h6 className='ProductCard-product-description'>{data.description}</h6>
          <div>
            { (data.stock !== 0) ? (<h5 className='ProductCard-product-in-stock'>In stock</h5>) : (<h5 className='ProductCard-product-not-in-stock'>Not in stock</h5>) }
            with { data.stock } in inventory.
          </div>
          <h5 className='ProductCard-product-price'>{data.price + "$"}</h5>
        </div>
        <button onClick={addToCartHandler} className='ProductCard-button'>Add to cart</button>
        { isAdmin && <button onClick={editHandler} className='ProductCard-button'>Edit product</button> }
        { isAdmin && <button onClick={deleteHandler} className='ProductCard-button'>Delete product</button> }
    </div>
  )
}
