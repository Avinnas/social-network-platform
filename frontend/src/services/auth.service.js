import axios from 'axios';
import {useAuth} from './AuthProvider'

const API_URL = "http://localhost:8080/api/v1/auth/";


    const register = (username, email, password) => {
        return axios.post(API_URL + 'signup', {
            username,
            email,
            password,
        })
    }
    const login = (username, password) => {
        const {setUser, setIsLoggedIn} = useAuth()

        return axios.post( API_URL + 'signin', {
            username,
            password
        })
            .then((response) => {
                if(response.data.accessToken){
                    const userDetails = JSON.stringify(response.data)
                    localStorage.setItem("user", userDetails)
                    setUser(userDetails)
                    setIsLoggedIn(true)
                }
                return response.data;
            })
    }

    const logout = () => {

        const {setUser, setIsLoggedIn} = useAuth()
        localStorage.removeItem("user");
        setUser(null)
        setIsLoggedIn(false)
    }

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;