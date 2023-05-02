import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {useState} from "react";
import getCurrentUser from "../utils/currentUser";
import Box from "@mui/material/Box";


export default function NewMessageForm(props) {

    const API_URL_SEND_MESSAGE = "/app/conversations/" + props.conversationId + "/messages";

    const [newMessageContent, setNewMessageContent] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();

        let message = {
            "content": newMessageContent,
        }
        console.log(props.clientRef)
        props.clientRef.sendMessage(API_URL_SEND_MESSAGE,JSON.stringify(message))
        message['user']= {
            "username": getCurrentUser().username
        };

        setNewMessageContent("");
    }

    return (
        <Box mx = {1}>
            <form className={'message-form'} onSubmit={handleSubmit}>
                <TextField
                    className={'message-text-field'}
                    fullwidth={true}
                    size="small"
                    id="filled-basic"
                    value={newMessageContent}
                    placeholder="message"
                    onChange={(e) => setNewMessageContent(e.target.value)}
                />
                <Box mx = {1}>
                    <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
                        Send
                    </Button>
                </Box>

            </form>
        </Box>
    )
}

