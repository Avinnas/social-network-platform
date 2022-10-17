import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: null,
    setIsLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem("user")) {
            setIsLoggedIn(true)
        }

    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;