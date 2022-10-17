import React, {useState} from "react";
import Button from "@mui/material";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

export default function Login() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        await login(event.target.username.value, event.target.password.value);
        navigate("/");
    }

    const login = (username, password) => {
        return axios
            .post(API_URL + "/signin", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    const userDetails = JSON.stringify(response.data);
                    localStorage.setItem("user", userDetails);
                    setIsLoggedIn(true);
                }
                return response.data;
            });
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="username" required/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required/>
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return <div className="login-form">{renderForm}</div>;
}
