import React, {useState} from "react";
import Button from "@mui/material";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../services/AuthProvider";
import axios from "axios";
import {Formik, useFormik} from "formik";
import * as Yup from "yup";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

export default function Register() {
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        await register(event.target.username.value, event.target.email.value, event.target.password.value, event.target.repeatedPassword.value);
        navigate("/");
    }

    const validate = (values) => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Required'
        } else {
            const mailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!mailRegExp.test(values.email)) {
                errors.email = 'Invalid email address'
            }
        }
        if (!values.username) {
            errors.username = 'Required'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 8) {
            errors.password = 'Password have at least 8 characters'
        }

        if (!values.repeatedPassword) {
            errors.repeatedPassword = 'Required'
        } else {
            if (values.password !== values.repeatedPassword) {
                errors.repeatedPassword = "Passwords must match"
            }
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            repeatedPassword: '',
        },
        validate,
        onSubmit: (values) => {
            register(values.username, values.email, values.password, values.repeatedPassword)
        },
    })

    const register = (username, email, password, repeatedPassword) => {
        axios
            .post(API_URL + "/signup", {
                email,
                username,
                password,
                repeatedPassword
            })
            .then((response) => {
                    alert("Signed up succesfully")
                }
            );
    };

    const renderForm = (
        <div className="form">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input onChange={formik.handleChange} value={formik.values.username} type="text" name="username"
                           required/>
                    <span>{formik.errors.username}</span>

                </div>
                <div className="input-container">
                    <label>Email </label>
                    <input onChange={formik.handleChange} value={formik.values.email} type="text" name="email"
                           required/>
                    <span>{formik.errors.email}</span>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input onChange={formik.handleChange} value={formik.values.password} type="password" name="password"
                           required/>
                    <span>{formik.errors.password}</span>
                </div>
                <div className="input-container">
                    <label>Repeat password </label>
                    <input onChange={formik.handleChange} value={formik.values.repeatedPassword} type="password"
                           name="repeatedPassword" required/>
                    <span>{formik.errors.repeatedPassword}</span>
                </div>
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );

    return <div className="login-form">{renderForm}</div>;
}
