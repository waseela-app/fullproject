import React, {useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from '../Context'

export default function Register() {

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const {setAuth} = useContext(UserContext)
  
  async function signup(){
    if ( name !=='' && password !=='' && email !=='' ){
      let item = {name,password,email}

      let result = await fetch("http://localhost:8000/api/register",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
          "Content-Type":'application/json',
          "Accept":'application/json'
        }
      })
      result = await result.json()
      localStorage.setItem("user-info", JSON.stringify(result))
      setAuth(true)
      navigate('/list')
    }
  }

  return (
      <div className="col-sm-6 offset-sm-3">
        <br/><h1>Register page</h1><br/>

        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="name"/><br/>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/><br/>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="email"/><br/>

        <button className="btn btn-primary" onClick={signup} >Sign up</button>
      </div>
  )
}