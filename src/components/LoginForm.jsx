import React, { useState, useEffect } from "react";
import api from "../api";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassowrd] = useState('');

    const submitCallback = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(
                '/api/token/',
                { username: `${username}`, password: `${password}` },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            console.log(res.data)
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem()
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request canceled');
            } else {
                console.error("Login error:", error);
                console.log(api.headers)
            }
        }
    };

    return (
        <form onSubmit={submitCallback} className="login-form">
            <h1 className="login-header">Login</h1>
            <input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                placeholder="Username...">
            </input>
            <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => { setPassowrd(e.target.value) }}
                placeholder="Password...">
            </input>

            <button className="login-submit" type="submit">
                Submit
            </button>
        </form>
    )
}


export default LoginForm;