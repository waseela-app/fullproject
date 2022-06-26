import React,{ useState, useEffect } from 'react'

export const UserContext = React.createContext({});

export default function ContextProvider({children}) {

  const [ Auth, setAuth ] = useState(null);

  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem("Auth")) 
    storedAuth && storedAuth ? setAuth(true) : setAuth(false)
  }, []);

  useEffect(() => {
    localStorage.setItem("Auth", Auth)
  }, [Auth]);

  return (
    <UserContext.Provider value={{Auth, setAuth}}>
      {children}
    </UserContext.Provider>  
  )
}