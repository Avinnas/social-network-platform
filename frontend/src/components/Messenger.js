import {useEffect, useState} from "react";
import Conversation from "./Conversation";
import './Messenger.css';
import axios from "axios";
import Button from "@mui/material/Button";

export default function Messenger() {
    const API_URL_GET_CONVERSATIONS = process.env.REACT_APP_API_URL + "/conversations";

    const [conversations, setConversations] = useState([])
    const [currentConversation, setCurrentConversation] = useState(null)

    useEffect(() => {
        axios(API_URL_GET_CONVERSATIONS)
            .then((response) => {
                setConversations(response.data);
            })
    }, []);

    useEffect(() => {
        console.log(conversations)
        if (conversations.length > 0) {
            setCurrentConversation(conversations[conversations.length - 1]);
        }
    }, [conversations])

    const changeConversation = (index) => {
        setCurrentConversation(conversations[index])
        console.log(conversations[index])
    }

    return (
        <>
            <div id={'messenger-container'}>
                <div id={'conversation-tabs-container'} className={'inline-div'}>
                    {conversations.map(
                        (conversation, index) =>
                            <Button variant="contained"
                                    fullWidth={true}
                                    sx={{mt: 1}}
                                    key={conversation.conversationId}
                                    onClick={() => changeConversation(index)}>{conversation.title}</Button>)}
                </div>
                <div id={'conversation-messages-container'} className={'inline-div'}>
                    {currentConversation && <Conversation key={currentConversation.conversationId}
                                                          id={currentConversation.conversationId}/>}
                </div>
            </div>
        </>

    )

}