import React from 'react'
import { ProductCard } from './ProductCard'

export const ProductList = ({data}) => {
  return (
    <div className='ProductList-container'>
        {
            data.map((product, index) => {
                return (
                    <ProductCard
                        key={index}
                        
                    />
                )
            })
        }
    </div>
  )
}
