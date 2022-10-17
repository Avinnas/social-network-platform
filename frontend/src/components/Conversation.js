import {useEffect, useState} from "react";
import './Conversation.css'
import SockJsClient from 'react-stomp';
import NewMessageForm from "./NewMessageForm";
import axios from "axios";
import Message from "./Message";
import getCurrentUser from "../utils/currentUser";


export default function Conversation(props){

    const API_URL_GET_MESSAGES = process.env.REACT_APP_API_URL + "/conversations/" + props.id + "/messages"

    const [messages,setMessages] = useState([]);
    let clientRef = null;

    useEffect(() => {
        axios.get(API_URL_GET_MESSAGES)
            .then((response) => {
                setMessages(response.data)
            });
    }, []);


    return(

        <>
            <SockJsClient url={'http://' + getCurrentUser().accessToken +'@localhost:8080/websocket'}
                          topics={['conversations/'+ props.id + '/messages']}
                          onConnect={() => {
                              console.log("connected");
                          }}
                          onDisconnect={() => {
                              console.log("Disconnected");
                          }}
                          onMessage={(msg) => {
                              console.log(msg);
                          }}
                          ref={(client) => {
                              clientRef = client
                          }}/>
            {messages.map((message, index) => <Message key={"message"+index}{...message}/>)}

            <NewMessageForm conversationId={props.id} clientRef={clientRef} messages={messages} setMessages={setMessages}/>
                </>
    )
}
