import React, { useState, useContext } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import './auth.css';

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "LOGIN_START" })

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/");
        } catch (err) {
            alert(err.response.data.message)
            dispatch({ type: "LOGIN_FAILURE", payload: err.message })
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn" type="submit">Login</button>
            </form>

            <p>Don't have an account? <Link to="/register">Create</Link></p>
        </div>
    );

}

export default Login