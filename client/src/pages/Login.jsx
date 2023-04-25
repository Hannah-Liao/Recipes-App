import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
import loginImg from "../assets/images/login.svg";
import '../styles/auth.css';

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
        <section className='auth'>
            <img src={loginImg} alt="" />

            <div className="auth-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn auth_btn" type="submit">Login</button>
                </form>

                <p>Don't have an account? <Link to="/register">Create</Link></p>
            </div>
        </section>
    );

}

export default Login