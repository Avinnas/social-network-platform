import AuthService from "../services/auth.service"
import {useAuth} from "../services/AuthProvider";


export default function Message(props) {
    const {user} = useAuth();
    return (
        <div
            className={`message ${props.user.username === user.username ? 'right' : 'left'}`}> {props.content} </div>
    )
}