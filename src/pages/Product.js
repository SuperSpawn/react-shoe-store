import React from 'react'
// page for product stuff 
import '../styles/pages/Product.css'


export const Product = ({currentProduct, setProductArray, isAdmin}) => {

  return (
    <div className='Product-container'>
      <div className='Product-left-section'>
        <img src={currentProduct.avatar} alt="product current"/>
        <h4>{currentProduct.name}</h4>
        <h6>{currentProduct.description}</h6>
        <h6>{currentProduct.price}$</h6>
      </div>
      <div className='Product-right-section'>
        <div className='Product-buttons'>
          <button>Add to cart</button>
          <button>Edit product</button>
          <button>Delete product</button>
        </div>
      </div>
      <div className='Product-admin-section'>
        <p>Name:</p>
        <input type='text' />
        <p>Description:</p>
        <input type='text' />
        <p></p>
      </div>
    </div>
  )
}
