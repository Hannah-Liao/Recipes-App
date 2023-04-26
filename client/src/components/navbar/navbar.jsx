import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import './navbar.css';


import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {

    const headerRef = useRef("null");

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

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
        dispatch({ type: "LOGOUT" })
        navigate('/');
    }

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("sticky_header")
            } else {
                headerRef.current.classList.remove("sticky_header")
            }
        })
    }

    useEffect(() => {
        stickyHeaderFunc();

        return window.removeEventListener("scroll", stickyHeaderFunc)
    })

    return (

        <header className="navbar" ref={headerRef}>

            {/* -------------------- logo -------------------- */}
            <Link className="logo" to="/"><img src={logo} alt="logo" width={45} /></Link>

            {/* --------------------- nromal menu -------------------- */}
            <div className="navigation">
                <ul className="lg-menu">
                    <li> <Link to="/recipes-bank">Recipes</Link></li>
                    <li> <Link to="/create-recipe">Create</Link></li>
                    {user && <li> <Link to="/saved-recipes">Saved Recipes</Link></li>}
                </ul>
            </div>

            {/* --------------------- auth btns -------------------- */}
            <div className="nav_right">
                <div className="nav_btns">
                    {
                        !user ? <>
                            <button className="btn secondary_btn" >
                                <Link to="/login">Login</Link>
                            </button>
                            <button className="btn primary_btn" >
                                <Link to="/register">Register</Link>
                            </button>

                        </>
                            : <>
                                <FontAwesomeIcon icon={faUser} className="faUser" />
                                <h5>{user.data.username}</h5>
                                <button className="btn btn-dark" onClick={logout}>Logout</button>
                            </>
                    }
                </div>
            </div>

            {/* -------------------- burger menu -------------------- */}
            <div className="mobile-menu" onClick={updateMenu}>
                <div className="burger-menu" >
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>
                    <div className={burger_class}></div>

                    <div className={menu_class}>
                        <Link to="/recipes-bank">Recipes Bank</Link>
                        <Link to="/create-recipe">Create Recipes</Link>
                        {user && <Link to="/saved-recipes">Saved Recipes</Link>}
                    </div>
                </div>
            </div>
        </header>
    );
}