import React, { createContext, useContext, useState} from 'react'

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setting_password = process.env.REACT_APP_PASSWORD;

    const login = (password) =>{
        if(password === setting_password){
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    }


  return (
    <div>
      <AuthContext.Provider value={{isAuthenticated,login,logout}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export  function useAuth () {
    return useContext(AuthContext)
}
