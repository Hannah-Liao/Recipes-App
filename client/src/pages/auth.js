import { Login, Register } from "../components/auth/auth";

export const Auth = () => {
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}
