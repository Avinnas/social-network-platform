import {useLocation, Navigate} from "react-router-dom"
import {useAuth} from "../services/AuthProvider";


export default function RequireAuth({ children }) {
    let location = useLocation();
    const {isLoggedIn} = useAuth()

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}