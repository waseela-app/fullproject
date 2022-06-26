import { useContext } from 'react';
import './App.css';
import { Navigate, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages//Register'
import AddProduct from './Pages//AddProduct'
import UpdateProduct from './Pages//UpdateProduct'
import {UserContext} from './Context'
import Header from './Components//Header';
import ProductList from './Pages//ProductList';
import UserList from './Pages//UserList';

function App() {

  const {Auth} = useContext(UserContext)

  return (
    <div>
      <Header />
      <Routes>
        {!Auth && (
          <>
            <Route path='/login' element={ <Login />}/>
            <Route path='/register' element={ <Register />}/>
          </>
        )}
        {Auth && (
          <>
            <Route path='/add' element={ <AddProduct />}/>
            <Route path="/update/:id" element={ <UpdateProduct />}/>
            <Route path='/list' element={ <ProductList />}/>
            <Route path='/users' element={ <UserList />}/>
          </>
        )}
        <Route path='*' element={<Navigate to={Auth ? "/list" : "/register"}/>}/>
      </Routes>
    </div>
  );
}
export default App;