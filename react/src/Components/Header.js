import React, {useContext} from 'react'
import {Navbar,Nav, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../Context'

export default function Header() {

  const navigate = useNavigate()
  const {Auth, setAuth} = useContext(UserContext)
  let user = JSON.parse(localStorage.getItem('user-info'))

  function logout(){
    localStorage.clear();
    setAuth(false)
    navigate('/register')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className='px-3' href="#home">Logo</Navbar.Brand>
        <Nav className="me-auto navbar_wrapper">
          {
            Auth ?
            <>
              <Link className='navLink' to="/list">Product List</Link>
              <Link className='navLink' to="/add">Add Product</Link>
              <Link className='navLink' to="/users">User List</Link>
            </>
            :<>
              <Link className='navLink' to="/login">Login</Link>
              <Link className='navLink' to="/register">Register</Link>
            </>
          }
        </Nav>
        {Auth && (
          <Nav>
          <NavDropdown title={user && user.name} >
            <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        )}
      </Navbar>   
    </div>
  )
}