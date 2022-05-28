import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import "./AdminDock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

const AdminDock = (props) => {
    const location =useLocation();

    const exitToAdmin = () => {
        props.onExitToAdmin("","");
    }

    return (
        <div>
            <div className={props.loggedUser == "" ?  "" : "admin-dock-no-display"}>
                <div className="no-logged-admin-user">
                    <p>ACCEDI PER VISUALIZZARE LA DOCK</p>
                </div>
            </div>
            <div className={props.loggedUser == "" ? "admin-dock-no-display" : ""}>
                <div className="admin-dock-navigation-section">  
                    <div className="row m-0">
                        <div className="col-10 p-0"></div>
                        <div className="col-lg-2 p-0">
                            <div className="admin-dock-exit-wrapper">
                                <Link className="admin-dock-log-out" to="/settings">IMPOSTAZIONI <FontAwesomeIcon icon={faScrewdriverWrench}/></Link><br/>
                                <Link className="admin-dock-log-out" to="/" onClick={exitToAdmin}>ESCI <FontAwesomeIcon icon={faDoorOpen}/></Link>
                            </div>
                        </div>
                        <p className="admin-dock-page-name">Admin Dock</p>
                    </div>
                    <div className="admin-dock-link-wrapper">
                        <Link className={location.pathname == "/admin-dock" ? "admin-dock-link-active" : "admin-dock-link"} to="">VISITE</Link>
                        <Link className={location.pathname == "/admin-dock/events" ? "admin-dock-link-active" : "admin-dock-link"} to="events">EVENTI</Link>
                        <Link className={location.pathname == "/admin-dock/planners" ? "admin-dock-link-active" : "admin-dock-link"} to="planners">ORGANIZZATORI</Link>
                        <Link className={location.pathname == "/admin-dock/users" ? "admin-dock-link-active" : "admin-dock-link"} to="users">UTENTI</Link>
                        <Link className={location.pathname == "/admin-dock/services" ? "admin-dock-link-active" : "admin-dock-link"} to="services">SERVIZI</Link>
                    </div>
                </div> 
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDock;