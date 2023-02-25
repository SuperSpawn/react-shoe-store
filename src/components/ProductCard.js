import React from 'react'

export const ProductCard = ({data, isAdmin}) => {
  return (
    <div className='ProductCard-container'>
        <img/>
        <h4>Test</h4>
        <h6>Test</h6>
        <h5>tetst</h5>
        <button>Add to cart</button>
        { isAdmin && <button>Edit product</button> }
    </div>
  )
}
