import getCurrentUser from "../utils/currentUser";


export default function Message(props) {
    const user = getCurrentUser();
    return (
        <div
            className={`message ${props.user.username === user.username ? 'right' : 'left'}`}> {props.content} </div>
    )
}