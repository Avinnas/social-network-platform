import React, {useState} from "react";
import Button from "@mui/material";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";
import axios from "axios";
import {useFormik} from "formik";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

export default function Login() {
    const navigate = useNavigate();
    const {setIsLoggedIn} = useAuth();
    const [isError, setIsError] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        await login(event.target.username.value, event.target.password.value);
    }

    const login = (username, password) => {
        axios
            .post(API_URL + "/signin", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.accessToken) {
                    const userDetails = JSON.stringify(response.data);
                    localStorage.setItem("user", userDetails);
                    setIsLoggedIn(true)
                    navigate("/");
                }
            }).catch(() =>
            setIsError(true)
        )

    };

    const validate = (values) => {
        const errors = {}
        if (!values.username) {
            errors.username = 'Required'
        }

        if (!values.password) {
            errors.password = 'Required'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            login(values.username, values.password)
        },
    })

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input onChange={formik.handleChange} value={formik.values.username} type="text" name="username"
                           required/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password"
                           required/>
                </div>
                {isError && <span> Wrong password or username</span>}
                <div className="button-container">
                    <input type="submit" value={"Sign in"}></input>
                </div>
            </form>
        </div>
    );

    return <div className="login-form">{renderForm}</div>;
}
