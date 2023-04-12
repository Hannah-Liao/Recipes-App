import { Link } from "react-router-dom";
import homeImg from "../assets/images/home-img.jpg";

export const Home = () => {
    return (
        <div className="body-div home">
            <div className="home-text">
                <h1>Delicious plant-based recipes.</h1>
                <h5>Sign up to create your own recipes, and save recipes you like 😋</h5>
                <Link className="btn" to="/auth">Sign up free !</Link>
            </div>
            <img src={homeImg} width={100} />
        </div>
    )
}
