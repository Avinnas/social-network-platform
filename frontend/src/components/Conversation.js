import {useEffect, useRef, useState} from "react";
import './Conversation.css'
import NewMessageForm from "./NewMessageForm";
import axios from "axios";
import Message from "./Message";
import getCurrentUser from "../utils/currentUser";
import SockJsClient from "react-stomp";


export default function Conversation(props) {

    const API_URL_GET_MESSAGES = process.env.REACT_APP_API_URL + "/conversations/" + props.id + "/messages"
    const API_URL_DELETE_MESSAGE = "/app/conversations/" + props.id + "/messages";

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

    function updateMessage(messageReceived) {
        let replaced = false;
        const newMessagesArray = messages.map(message => {
            if (message.messageId === messageReceived.messageId) {
                replaced = true;
                return messageReceived;
            }
            return message;
        })
        if(replaced === false){
            newMessagesArray.push(messageReceived)
        }
        setMessages([...newMessagesArray]);
    }

    const onMessageReceived = (messageReceived) => {
        updateMessage(messageReceived);
    }

    const onMessageDeleted = (id) => {
        // console.log(id)
        // const newMessagesArray = messages.map(message => {
        //     if (message.messageId === id) {
        //         message.deleted = true;
        //         console.log(message)
        //     }
        //     return message;
        // })
        // setMessages(newMessagesArray);
        // console.log(newMessagesArray);

        clientRef.sendMessage(API_URL_DELETE_MESSAGE + "/" + id + "/delete")
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
            {messages.map((message, index) => <Message onDeleted={onMessageDeleted}
                                                       key={"message" + index}{...message}/>)}

            <NewMessageForm conversationId={props.id} clientRef={clientRef} messages={messages}
                            setMessages={setMessages}/>
        </>
    )
}
