import {useEffect, useState} from "react";
import Conversation from "./Conversation";
import './Messenger.css';
import axios from "axios";
import Button from "@mui/material/Button";

export default function Messenger() {
    const API_URL_GET_CONVERSATIONS = process.env.REACT_APP_API_URL + "/conversations";

    const [conversations, setConversations] = useState([])
    const [currentConversationId, setCurrentConversationId] = useState(null)

    useEffect(() => {
        axios(API_URL_GET_CONVERSATIONS)
            .then((response) => {
                setConversations(response.data);
            })
    }, []);

    useEffect(() => {
        console.log(conversations)
        if (conversations.length > 0) {
            setCurrentConversationId(conversations[conversations.length - 1].conversationId);
            console.log(conversations[conversations.length - 1].conversationId)
        }
    }, [conversations])

    const changeConversation = (id) => {
        setCurrentConversationId(id)
        console.log(id)
    }

    useEffect(()=>{
        console.log(currentConversationId)

    }, [currentConversationId])

    return (
        <>
            <p>{currentConversationId}</p>
            <div id={'messenger-container'}>
                <div id={'conversation-tabs-container'} className={'inline-div'}>
                    {conversations.map(
                        (conversation, index) => <Button variant="contained"
                                                         containerViewStyle={{width: '100%'}}
                                                         fullWidth={true}
                                                         sx={{mt:1}}
                                                      key={conversation.conversationId}
                                                      onClick={() => changeConversation(conversation.conversationId)}>{conversation.title}</Button>)}
                </div>
                <div id={'conversation-messages-container'} className={'inline-div'}>
                    {currentConversationId && <Conversation key={currentConversationId} id={currentConversationId}/>}
                </div>
            </div>
        </>

    )

}