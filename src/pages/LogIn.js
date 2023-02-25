import React, {useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";

import '../styles/pages/Login.css'


export const LogIn = ({adminArray, setIsAdmin, setCurrentAdmin}) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  let navigate = useNavigate()

  const loginHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    for(let i of adminArray) {
      if(i.email === email && i.password === password) { 
        setCurrentAdmin(i);
        setIsAdmin(true)
        navigate("/")
        return;
      }
    }

    setIsInvalid(true);
  }


  return (
    <div className='Login-container'>
      <div className='Login-card-container'>
        <div className='Login-card-input'>
          <p>Email:</p>
          <input ref={emailRef} type="text" placeholder="e.g. user@domain.com..." name="search"/>
        </div>
        <div className='Login-card-input'>
          <p>Password:</p>
          <input ref={passwordRef} type="text" placeholder="e.g. 1234..." name="search"/>
        </div>
        { isInvalid && <p className='Login-card-error-message'>*Invalid user</p> }
        <button onClick={loginHandler} className='Login-card-button'>Login</button>  
      </div>
    </div>
  )
}
