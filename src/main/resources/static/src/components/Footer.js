import React from "react";
import "./Footer.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFaceAngry } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <div>
            <i id="decoration-leaf" className="fa fa-leaf"></i>
            <footer className="footer"> 
                <div className="row m-0">
                    <div className="col-8 p-0">
                    </div>
                    <div className="col-4 p-0">
                        <p className="footer-follow-text">Seguici anche su:</p>
                        <div id="social-logo">
                            <FontAwesomeIcon id="instagram" icon={faInstagram}></FontAwesomeIcon>
                            <FontAwesomeIcon id="facebook" icon={faFacebook}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;