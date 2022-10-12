import axios from 'axios';

const API_URL = "http://localhost:8080/api/v1/auth/";

const setAuthorizationHeader = (token) =>{
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    console.log(axios.defaults.headers.common)
}

const deleteAuthorizationHeader = () =>{
    delete axios.defaults.headers.common["Authorization"];
}


const register = (username, email, password) => {
    return axios.post(API_URL + 'signup', {
        username,
        email,
        password,
    })
}
const login = (username, password) => {
    return axios.post( API_URL + 'signin', {
        username,
        password
    })
        .then((response) => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data))
                setAuthorizationHeader(response.data.accessToken);
            }
            return response.data;
        })
}

const logout = () => {
    localStorage.removeItem("user");
    deleteAuthorizationHeader();
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;