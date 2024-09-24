import React, { createContext, useContext, useState} from 'react'

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (password) =>{
        if(password === 'password'){
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
