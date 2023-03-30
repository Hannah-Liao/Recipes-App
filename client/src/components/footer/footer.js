import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './footer.css';


export const Footer = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);

    return (
        <div className="footer">

            <div className="links-container">
                <h3>Site links</h3>
                <div className="site-links">
                    <Link to="/recipes-bank">Recipes Bank</Link>
                    <Link to="/create-recipe">Create Recipes</Link>
                    {cookies.access_token && <Link to="/saved-recipes">Saved Recipes</Link>}
                </div>
                <a href="https://www.freepik.com/free-vector/sticker-design-with-tomato-isolated_16460149.htm#page=6&query=food%20svg&position=28&from_view=search&track=ais">Image by brgfx</a> on Freepik
            </div>

            <div className="links-container">
                <h3>About us</h3>
                <Link to="/about">Privacy Policy</Link>

            </div>

            <div className="links-container">
                <h3>Connect</h3>

                <Link to="https://en-gb.facebook.com/"><FontAwesomeIcon className="footer-icons" icon={faFacebook} /></Link>
                <Link to="https://www.instagram.com/"><FontAwesomeIcon className="footer-icons" icon={faInstagram} /></Link>
                <Link to="https://twitter.com/"><FontAwesomeIcon className="footer-icons" icon={faTwitter} /></Link>
            </div>

        </div>
    );
}