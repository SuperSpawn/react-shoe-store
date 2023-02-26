import React,{useEffect, useRef} from 'react'
// page for product stuff 
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import '../styles/pages/Home.css'
import '../styles/pages/Product.css'


export const Product = ({currentProduct, setProductArray, isAdmin, isEditingProduct, setIsEditingProduct, setCurrentProduct, setIsAdmin, setCurrentAdmin, currentAdmin, productArray}) => {

  let navigate = useNavigate()

  const productNameRef = useRef(null)
  const productDescriptionRef = useRef(null)
  const productPriceRef = useRef(null)
  const productStockRef = useRef(null)


  let isGood = useRef(true);



  const logoutHandler = () => {
    localStorage.removeItem('current-admin');
    setIsAdmin(false);
    setCurrentAdmin(null);
  };


  console.log(currentAdmin)
  console.log(currentProduct)
  
    if(!currentAdmin) {
      const admin = JSON.parse(localStorage.getItem('current-admin'))
      if(admin) {
          setCurrentAdmin(admin)
          setIsAdmin(true);
      }
    }
  
    if(!currentProduct) {
      const product = JSON.parse(localStorage.getItem('current-product'))
      if(product) {
        console.log(product)
        setCurrentProduct(product);
        isGood.current = true;
      }
    }
  
  const addToCartHandler = () => {
    navigate('/cart');
  }
  const editProductHandler = () => {
    setIsEditingProduct(true)
  }
  const saveChangesHandler = () => {
    for(let i in productArray) {
      if(productArray[i].id === currentProduct.id) {
        currentProduct.name = productNameRef.current.value;
        currentProduct.description = productDescriptionRef.current.value;
        currentProduct.price = productPriceRef.current.value;
        currentProduct.stock = productStockRef.current.value;

        fetch(`https://63f84b981dc21d5465bc6582.mockapi.io/shoes/${currentProduct.id}`, {
          method: 'PUT', // or PATCH
          headers: {'content-type':'application/json'},
          body: JSON.stringify(currentProduct)
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          // handle error
          console.log('error: cannot update product')
        }).then(task => {
          // Do something with updated task
          localStorage.setItem('current-product', JSON.stringify(task))
          setCurrentProduct(task)
          productArray[i] = task;
          setProductArray(productArray)
        }).catch(error => {
          // handle error
          console.error(error.message);
        })
      }
    }
  }
  const cancelChangesHandler = () => {
    productNameRef.current.value = ''
    productDescriptionRef.current.value = ''
    productPriceRef.current.value = ''
    productStockRef.current.value = ''


    setIsEditingProduct(false)
  }
  const deleteHandler = () => {
    for(let i in productArray) {
      if(productArray[i].id === currentProduct.id) {

        fetch(`https://63f84b981dc21d5465bc6582.mockapi.io/shoes/${currentProduct.id}`, {
          method: 'DELETE',
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          // handle error
          console.log("cannot delete")
        }).then(task => {
          // Do something with deleted task
          setCurrentProduct(null)
          productArray.splice(i, 1)
          setProductArray(productArray)
          navigate('/')
        }).catch(error => {
            // handle error
            console.error(error.message)
        })
      }
    }
  }

  if(isGood.current === false) {
    return (
      <div className='Product-container'>
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
      </div>
    )
  }

  return (
    <div className='Product-container'>
      <div className='Product-navbar-section'>
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
      </div>
      <div className='Product-left-section'>
        <img src={currentProduct.avatar} alt="product current"/>
        <h4 className='Product-left-section-marg Product-left-section-name'>{currentProduct.name}</h4>
        <h6 className='Product-left-section-marg Product-left-section-description'>{currentProduct.description}</h6>
        <h6 className='Product-left-section-marg Product-left-section-price'>{currentProduct.price}$</h6>
        {
          (currentProduct.stock !== 0) ? (<h6 className='Product-left-section-marg Product-left-section-in-stock'>In stock with {currentProduct.stock} in inventory</h6>) : (<h6 className='Product-left-section-marg Product-left-section-not-in-stock'>Not in stock</h6>)
        }
      </div>
      <div className='Product-right-section'>
        <div className='Product-buttons'>
          <button onClick={addToCartHandler}>Add to cart</button>
          { isAdmin && <button onClick={editProductHandler}>Edit product</button>}
          { isAdmin && <button onClick={deleteHandler}>Delete product</button>}
        </div>
      </div>
      
      { isAdmin && isEditingProduct && <div className='Product-admin-section'>
        <div className='Product-admin-section-input-section'>
          <div className='Product-admin-section-input'>
            <p>Name:</p>
            <input ref={productNameRef} type='text' />
          </div>
          <div className='Product-admin-section-input'>
            <p>Description:</p>
            <input ref={productDescriptionRef} type='text' />
          </div>
          <div className='Product-admin-section-input'>
            <p>Price:</p>
            <input ref={productPriceRef} type='text' />
          </div>
          <div className='Product-admin-section-input'>
            <p>Stock</p>
            <input ref={productStockRef} type='text' />
          </div>
        </div>

        <div className='Product-admin-section-button-section'>
          <button onClick={saveChangesHandler}>Save changes</button>
          <button onClick={cancelChangesHandler}>Cancel changes</button>
          <button onClick={deleteHandler}>Delete product</button>
        </div>

      </div> }

    </div>
  )
}
