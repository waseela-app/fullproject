import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const {setAuth} = useContext(UserContext);

  async function login(){

    let item = { email, password }

    let result = await fetch("http://localhost:8000/api/login",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{
        "Content-Type":'application/json',
        "Accept":'application/json'
      }
    })
    result = await result.json()
    if (result){
    localStorage.setItem("user-info", JSON.stringify(result))
    setAuth(true)
    navigate('/list')
    }
    else{console.log("error")}
  }

  return (      
    <div className='col-sm-6 offset-sm-3'>
      <br/><h1>Login page</h1><br/>
      <input type="text" placeholder="email" className='form-control' onChange={(e)=>{setEmail(e.target.value)}} /><br/>
      <input type="password" placeholder="password" className='form-control' onChange={(e)=>{setPassword(e.target.value)}} /><br/>
      <button onClick={login} className="btn btn-primary" >Login</button>
    </div>
  )
}