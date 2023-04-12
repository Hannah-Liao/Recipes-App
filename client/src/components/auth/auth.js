import { useState } from "react";
import axios from "axios"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import './auth.css';

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_, setCookies] = useCookies(["access_token"])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /////////////////////////need to change here ,anyone can login//////////////
            const response = await axios.post("http://localhost:3001/auth/login", { username, password });
            setCookies("access_token", response.data.token);
            console.log(response.data)
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthForm username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            handleSubmit={handleSubmit}
        />);

}

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/auth/register", { username, password });
            alert(response.data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AuthForm username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            handleSubmit={handleSubmit}
        />);

}

const AuthForm = ({ username, setUsername, password, setPassword, label, handleSubmit }) => {
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn" type="submit">{label}</button>
            </form>
        </div>
    );
}