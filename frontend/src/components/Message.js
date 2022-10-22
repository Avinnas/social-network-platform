import getCurrentUser from "../utils/currentUser";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


export default function Message(props) {
    const user = getCurrentUser();
    console.log(props);
    const align = props.user.username === user.username ? 'right' : 'left';
    const specialProperties = props.deleted ? ' deleted' : (props.edited ? ' edited' : '');
    return (
        <>

            <div className={"flex-container changed-axis " + align}>
                <div><p className={`username-label ` + align}>{props.user.username}</p></div>
                <div className={"flex-container"}>
                    <IconButton aria-label="delete" disabled color="primary">
                        <DeleteIcon/>
                    </IconButton>
                    <div
                        className={`message ` + align + specialProperties}> {props.content} </div>
                </div>

            </div>

        </>
    )
}