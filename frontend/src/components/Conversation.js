import {useEffect, useState} from "react";
import './Conversation.css'
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';


export default function Conversation(props){

    const [messages,setMessages] = useState([]);
    const [newMessageContent, setNewMessageContent] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();

        let res = await fetch("https://httpbin.org/post", {
            method: "POST",
            body: JSON.stringify({
                content: newMessageContent
            })
        });

        let resJson = await res.json();
        setNewMessageContent("");
        if(res.status!==200){
            alert("Error occurred");
        }
    }

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/` + props.id + `/comments`)
            .then((response) => {
                console.log(response);
                response.json().then((json) => setMessages(json))
            });
    }, [props.id]);


    return(
        <>
            {messages.map((message,index) => <div className={`message ${index % 2 ? 'left' : 'right'}`}> {message.body} </div>)}
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
        </>
    )

}