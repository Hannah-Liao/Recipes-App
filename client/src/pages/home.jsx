import { Link } from "react-router-dom";
import homeImg from "../assets/images/home-img.jpg";
import "../styles/home.css";

import Newsletter from "../components/newsletter/Newsletter";
import TrendingReicipe from "../components/trending-recipes/TrendingReicipe";
import Subtitle from "../shared/subtitle/Subtitle";

export const Home = () => {
    return (
        <>
            <section className="hero_header">
                <div className="home-text">
                    <Subtitle subtitle={"Plan your meal so easy"} />
                    <h1>Delicious world-wide recipes.</h1>
                    <h3>Sign up to create your own recipes, and save recipes you like 😋</h3>
                    <Link className="btn primary_btn" to="/register">Sign up free !</Link>
                </div>

                <img src={homeImg} width={100} alt="hero_img" />
            </section>

            <section >
                <Subtitle subtitle={"Explore"} />
                <h2>Trending recipes</h2>
                <TrendingReicipe />
            </section>

            <Newsletter />
        </>
    )
}
