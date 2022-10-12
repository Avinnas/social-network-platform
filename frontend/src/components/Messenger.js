import {useEffect, useState} from "react";
import Conversation from "./Conversation";
import './Messenger.css';
import axios from "axios";

const API_URL= "http://localhost:8080/api/v1/conversations";

export default function Messenger(){
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        axios(API_URL)
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