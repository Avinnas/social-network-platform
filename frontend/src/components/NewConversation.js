import Button from "@mui/material/Button";
import React, {useState} from "react";
import axios from "axios";

export default function NewConversation(props) {
    const API_USER_ENDPOINT = process.env.REACT_APP_API_URL + "/users";
    const API_CONVERSATION_ENDPOINT = process.env.REACT_APP_API_URL + "/conversations";

    const [isExpanded, setIsExpanded] = useState(false);
    const [userNotExists, setUserNotExists] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .get(API_USER_ENDPOINT + "/search", {
                params: {
                    username: e.target.username.value
                }
            })
            .then((response) => {
                axios.get(API_CONVERSATION_ENDPOINT + "/search", {
                    params: {
                        otherUsername: e.target.username.value
                    }
                })
                    .then((response) =>
                        console.log(response.data))
                    .catch((err) => {
                        if (err.response.status === 404) {
                            axios.post(API_CONVERSATION_ENDPOINT, {otherUsername: e.target.username.value})
                                .then((response) => {

                                    props.setCurrentConversation(response.data);
                                    props.setConversations([... props.conversations, response.data]);
                                })
                        }
                    })

            })
            .catch((err) => {
                console.log(err)
                if (err.response.status === 404) {
                    console.log(404)
                    setUserNotExists(true);
                }
            })
    }

    return (
        <>
            {!isExpanded &&
                <Button variant="contained"
                        fullWidth={true}
                        color={"secondary"}
                        sx={{mt: 1}}
                        key={"new"}
                        onClick={() => setIsExpanded(true)}>
                    New conversation
                </Button>
            }
            {
                isExpanded &&
                <div id={"new-conversation-container"}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            New conversation:
                            <label>Username </label>
                            <input type="text" name="username"
                                   required/>
                        </div>
                        <input type="submit" value={"Start"}></input>
                    </form>
                    {userNotExists && <span> Invalid username </span>}
                </div>

            }

        </>

    )
}