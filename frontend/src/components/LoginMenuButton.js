import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import * as React from "react";
import {useAuth} from "../services/AuthProvider";



export default function LoginMenuButton(){
    const {isLoggedIn} = useAuth();
    if(!isLoggedIn){
        return (

            <Link to="/login"> <Button color="inherit">Login</Button></Link>
        )
    }
}