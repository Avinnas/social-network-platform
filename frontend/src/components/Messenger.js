import {useEffect, useState} from "react";
import Conversation from "./Conversation";
import './Messenger.css';

export default function Messenger(){
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => {
                console.log(response);
                response.json().then((json) => setConversations(json))
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