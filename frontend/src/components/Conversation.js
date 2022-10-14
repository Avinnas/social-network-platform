import {useEffect, useState} from "react";
import './Conversation.css'
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import NewMessageForm from "./NewMessageForm";
import axios from "axios";


export default function Conversation(props){

    const API_URL_GET_MESSAGES = process.env.REACT_APP_API_URL + "/conversations/" + props.id + "/messages"

    const [messages,setMessages] = useState([]);

    useEffect(() => {
        axios.get(API_URL_GET_MESSAGES)
            .then((response) => {
                console.log(response);
                setMessages(response.data)
            });
    }, []);


    return(
        <>
            {messages.map((message,index) => <div className={`message ${index % 2 ? 'left' : 'right'}`}> {message.content} </div>)}

            <NewMessageForm conversationId={props.id}/>
        </>
    )

}