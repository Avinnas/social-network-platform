import getCurrentUser from "../utils/currentUser";
import Button from "@mui/material/Button";


export default function Message(props) {
    const user = getCurrentUser();
    const belongsToCurrentUser = props.user.username === user.username;
    const align = belongsToCurrentUser ? 'right' : 'left';
    const specialProperties = props.deleted ? ' deleted' : (props.edited ? ' edited' : '');
    return (
        <>

            <div className={"flex-container changed-axis " + align}>
                <div><p className={`username-label ` + align}>{props.user.username}</p></div>
                <div className={"flex-container"}>
                    {belongsToCurrentUser && <Button
                    variant="contained"
                    fullWidth={true}
                    sx={{mt: 1}}
                    onClick={() => {
                        props.onDeleted(props.messageId)
                    }} aria-label="delete" color="primary">
                    {/*<DeleteIcon/>*/}
                </Button>}
                    <div
                        className={`message ` + align + specialProperties}> {props.deleted ? "deleted" : props.content} </div>
                </div>

            </div>

        </>
    )
}