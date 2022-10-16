import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {useState} from "react";
import axios from "axios";


export default function NewMessageForm(props){

    const API_URL_SEND_MESSAGE = process.env.REACT_APP_API_URL + "/conversations/" + props.conversationId;

    const [newMessageContent, setNewMessageContent] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();

        let message = {
            "content" : newMessageContent
        }

        let res = await axios.post(API_URL_SEND_MESSAGE, message);
        message = res.data
        props.setMessages([...props.messages, message])

        setNewMessageContent("");
        if(res.status!==200){
            alert("Error occurred");
        }
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
                <Button type= "submit" variant="contained" endIcon={<SendIcon />}>

                </Button>
            </form>
        </div>
    )
}

