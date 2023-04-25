import React, { useState, useContext } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";
import '../styles/auth.css';
import registerImg from "../assets/images/sign_up.svg";

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URL}/auth/register`, { username, email, password });

            dispatch({ type: "REGISTER_SUCCESS" })
            navigate("/login")
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <section className='auth'>
            <img src={registerImg} alt="" />

            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="form-group">
                        <input type="text" id="username" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn auth_btn" type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </section>
    );

}

export default Register