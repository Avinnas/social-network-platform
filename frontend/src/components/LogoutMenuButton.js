import Button from "@mui/material/Button";
import AuthService from "../services/auth.service";
import './LogoutMenuButton.css'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";

export default function LogoutMenuButton(){
    const navigate = useNavigate()
    const {isLoggedIn} = useAuth();

    let logoutAndRedirect = () => {
        AuthService.logout();
        navigate("/")
    }
    return( isLoggedIn && <Button id={'logout-menu-button'} onClick={logoutAndRedirect}> Logout </Button>)
}