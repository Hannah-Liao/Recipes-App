import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import logo from "/Users/hanna/projects/recipe-app/client/src/images/logo.png";
import './navbar.css';
import { useState } from "react";

export const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(["access_token"]);

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
    const [menu_class, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    //toggle burger classes
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    }

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate('/');
    }

    return (

        <div className="navbar">
            {/* -------------------- burger menu -------------------- */}
            <div className="sx-menu">
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>

                    <div className={menu_class}>

                        <Link to="/recipes-bank">Recipes Bank</Link>
                        <Link to="/create-recipe">Create Recipes</Link>
                        {cookies.access_token && <Link to="/saved-recipes">Saved Recipes</Link>}

                        {!cookies.access_token ? <Link to="/auth"><FontAwesomeIcon icon={faUser} /> login</Link>
                            : <sapn className="logout">Log out<FontAwesomeIcon className="logout-icon" onClick={logout} icon={faRightToBracket} /></sapn>
                        }

                    </div>
                </div>
            </div>

            <Link className="logo" to="/"><img src={logo} alt="logo" width={45} /></Link>

            {/* --------------------- nromal menu -------------------- */}
            <div className="lg-menu">
                <Link to="/recipes-bank">Recipes Bank</Link>
                <Link to="/create-recipe">Create Recipes</Link>
                {cookies.access_token && <Link to="/saved-recipes">Saved Recipes</Link>}

                {!cookies.access_token ? <Link to="/auth"><FontAwesomeIcon icon={faUser} /> login</Link>
                    : <sapn className="logout" onClick={logout}>Log out<FontAwesomeIcon className="logout-icon" icon={faRightToBracket} /></sapn>
                }
            </div>

        </div>
    );
}