import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    isLoggedIn: null,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;