import {useEffect, useRef, useState} from "react";
import './Conversation.css'
import NewMessageForm from "./NewMessageForm";
import axios from "axios";
import Message from "./Message";
import getCurrentUser from "../utils/currentUser";
import SockJsClient from "react-stomp";


export default function Conversation(props) {

    const API_URL_GET_MESSAGES = process.env.REACT_APP_API_URL + "/conversations/" + props.id + "/messages"

    const [messages, setMessages] = useState([]);
    const [clientRef, setClientRef] = useState(null)
    const header = {
        "Authorization": "Bearer " + getCurrentUser().accessToken
    }

    useEffect(() => {
        axios.get(API_URL_GET_MESSAGES)
            .then((response) => {
                setMessages(response.data)
            });
    }, []);

    const onMessageReceived = (messageReceived) => {
        if (getCurrentUser().username !== messageReceived.user.username) {
            setMessages([...messages, messageReceived])
            return;
        }
        // Replace existing message
        const newMessagesArray = messages.map(message => {
            if (message.messageId === messageReceived.messageId) {
                return messageReceived;
            }
            return message;
        })
        setMessages(newMessagesArray);
    }


    return (

        <>
            <SockJsClient url={'http://localhost:8080/websocket'}
                          topics={['/topic/conversations/' + props.id + '/messages']}
                          onConnect={() => {
                              console.log("connected");
                          }}
                          onDisconnect={() => {
                              console.log("Disconnected");
                          }}
                          onMessage={(msg) => onMessageReceived(msg)}
                          headers={header}
                          ref={(client) => {
                              setClientRef(client)
                          }}/>
            <h2>{props.title}</h2>
                {messages.map((message, index) => <Message key={"message" + index}{...message}/>)}

            <NewMessageForm conversationId={props.id} clientRef={clientRef} messages={messages}
                            setMessages={setMessages}/>
        </>
    )
}
