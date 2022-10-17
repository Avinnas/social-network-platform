import Button from "@mui/material/Button";
import './LogoutMenuButton.css'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";

export default function LogoutMenuButton(){
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useAuth()

    let logoutAndRedirect = () => {
        logout();
        navigate("/")
    }

    const logout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false)
    }

    return( isLoggedIn && <Button id={'logout-menu-button'} onClick={logoutAndRedirect}> Logout </Button>)
}