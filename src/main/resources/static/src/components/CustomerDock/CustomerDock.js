import React from "react";
import {Link, Outlet, useLocation} from "react-router-dom";
import "../AdminDock/AdminDock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";

const CustomerDock = (props) => {
    const location =useLocation();

    const exitToCustomer = () => {
        props.onExitToCustomer("","");
    }

    return (
        <div>
            <div className={props.loggedUser == "" ?  "" : "admin-dock-no-display"}>
            <div className="admin-dock-navigation-section">  
                <p className="admin-dock-page-name">Oh Oh...</p>
                <p className="admin-dock-page-name">Non dovresti stare qui!</p>
            </div>
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
                                <Link className="admin-dock-log-out" to="/" onClick={exitToCustomer}>ESCI <FontAwesomeIcon icon={faDoorOpen}/></Link>
                            </div>
                        </div>
                        <p className="admin-dock-page-name">Customer Dock</p>
                    </div>
                    <div className="admin-dock-link-wrapper">
                        <Link className={location.pathname == "/customer-dock" ? "admin-dock-link-active" : "admin-dock-link"} to="">VISITE</Link>
                        <Link className={location.pathname == "/customer-dock/events" ? "admin-dock-link-active" : "admin-dock-link"} to="events">EVENTI</Link>
                        <Link className={location.pathname == "/customer-dock/quotes" ? "admin-dock-link-active" : "admin-dock-link"} to="quotes">PREVENTIVO</Link>
                    </div>
                </div> 
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerDock;