import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "@mui/material"
import "./Login.css"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service"

export default function Login() {
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        await AuthService.login(event.target.username.value,event.target.password.value);
        navigate("/");
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="username" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" required />
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="login-form">
            {renderForm}
        </div>
    );
}