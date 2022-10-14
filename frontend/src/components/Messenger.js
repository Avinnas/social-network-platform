import {useEffect, useState} from "react";
import Conversation from "./Conversation";
import './Messenger.css';
import axios from "axios";

export default function Messenger(){
    const API_URL_GET_CONVERSATIONS= process.env.REACT_APP_API_URL + "/conversations";

    const [conversations, setConversations] = useState([])

    useEffect(() => {
        axios(API_URL_GET_CONVERSATIONS)
            .then((response) => {
                console.log(response);
                setConversations(response.data);
            });
    }, []);

      return(
            <div id={'messenger-container'}>
                <div id = {'conversation-tabs-container'} className={'inline-div'}>
                    {conversations.map((conversation) => <div id={'conversation-tab'}>{conversation.title}</div>)}
                </div>
                <div id={'conversation-messages-container'} className={'inline-div'}>
                    {conversations && <Conversation id={1}/>}
                </div>
            </div>
        )

}