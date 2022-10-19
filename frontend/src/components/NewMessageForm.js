import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {useState} from "react";
import axios from "axios";
import getCurrentUser from "../utils/currentUser";


export default function NewMessageForm(props) {

    const API_URL_SEND_MESSAGE = "/app/conversations/" + props.conversationId + "/messages";

    const [newMessageContent, setNewMessageContent] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();

        let message = {
            "content": newMessageContent,
        }
        props.clientRef.sendMessage(API_URL_SEND_MESSAGE,JSON.stringify(message), {"Authorization": "Bearer " + getCurrentUser().accessToken})
        message['user']= {
            "username": getCurrentUser().username
        };
        props.setMessages([...props.messages, message])

        console.log(message)

        setNewMessageContent("");
    }

    return (
        <div>
            <form className={'right'} onSubmit={handleSubmit}>
                <TextField
                    id="filled-basic"
                    value={newMessageContent}
                    placeholder="message"
                    onChange={(e) => setNewMessageContent(e.target.value)}
                />
                <Button type="submit" variant="contained" endIcon={<SendIcon/>}>

                </Button>
            </form>
        </div>
    )
}

