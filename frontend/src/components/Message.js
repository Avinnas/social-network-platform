import getCurrentUser from "../utils/currentUser";


export default function Message(props) {
    const user = getCurrentUser();
    const className = props.user.username === user.username ? 'right' : 'left';
    return (
        <>
            <p className={`username-label ` + className}>{props.user.username}</p>
            <div
                className={`message `+ className}> {props.content} </div>
        </>
    )
}