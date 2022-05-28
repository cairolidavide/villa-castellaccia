import React, { useEffect, useState } from "react";
import "./Header.css"
import { Link, Outlet } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import Footer from "./Footer";

const Header = (props) => {
    const [loggedUser, setLoggedUser] = useState("");

    useEffect(() => {
        setLoggedUser(props.loggedUser);
    }, [props.loggedUser]);

    return (
        <div>
            <div className="title-container">
               <h1 className="title">Villa Castellaccia</h1><i id="title-icon" className="fa fa-pagelines"></i>
            </div>
            <div className="nav-bar-container">
                <nav className="nav-bar">
                    <div className="row m-0">
                        <div className="col-9 ">
                            <div className="links-wrapper">
                                <Link className="links" to="/">HOME</Link>
                                <Link className="links" to="events">EVENTI & MATRIMONI</Link>
                                <Link className="links" to="location">STRUTTURA</Link>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="login-wrapper">
                                <Link className={loggedUser == "" ? "log-in" : "header-no-display"} to="signin">Sign In</Link>
                                <Link className="log-in" to={loggedUser == "" ? "login" : (loggedUser.userType == "wedding-planner" || loggedUser.userType == "event-planner" ? "planner-dock" : `/${loggedUser.userType}-dock`)}>{loggedUser == "" ? "Log-In" : `${loggedUser.name} ${loggedUser.surname}`}</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Header;