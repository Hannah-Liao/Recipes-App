import { Link } from "react-router-dom";
import homeImg from "../assets/images/home-img.jpg";

import Newsletter from "../components/newsletter/Newsletter";
import TrendingReicipe from "../components/trending-recipes/TrendingReicipe";
import Subtitle from "../shared/subtitle/Subtitle";

export const Home = () => {
    return (
        <>
            <div className="body-div home">
                <div className="home-text">
                    <div className="hero_subtitle d-flex align-items-center">
                        <Subtitle subtitle={"Plan your meal so easy"} />
                    </div>
                    <h1>Delicious world-wide recipes.</h1>
                    <h5>Sign up to create your own recipes, and save recipes you like 😋</h5>
                    <Link className="btn" to="/auth">Sign up free !</Link>
                </div>
                <img src={homeImg} width={100} alt="" />
            </div>

            <div >
                <Subtitle subtitle={"Explore"} />
                <h2>Trending recipes</h2>
                <TrendingReicipe />
            </div>


            {/* <div className="body-div">
                <Subtitle subtitle={"Fans love"} />
                <h2>What our fans say</h2>

            </div> */}

            <Newsletter />
        </>
    )
}
