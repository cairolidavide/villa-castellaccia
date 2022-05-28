import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "./Home.css";
import homekiss from "../images/home-kiss.png";
import hometable from "../images/home-table.png";
import videoCastellaccia from "../videos/videocastellaccia.mp4";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="section-title">
                    <p>Scopri il fascino di un tempo</p>
            </div>
            <div>
               <video autoPlay={true} muted loop className="video">
                   <source src={videoCastellaccia} type="video/mp4"></source>
               </video>
            </div>
            <div className="container">
                <p className="message-text"> Unica nel suo genere</p>
                <p className="page-text">Oasi di pace, di verde, di sobria eleganza, Villa Castellaccia è l'unica vera villa-location di Maremma. 
                    Per anni luogo d’incontro di letterati ed artisti tra cui Federico Fellini, Italo Calvino, Pietro Citati, lo scrittore
                    che ha custodito la villa per 40 anni,  conserva ancora di quei ritrovi l’atmosfera conviviale e la vibrante poesia 
                    che ci coglie ogni dove, nelle stanze come nel parco secolare, grandioso ed intimo, ricco di spazi ora larghi ora raccolti,
                     ognuno dei quali vorresti vivere per più tempo possibile, da non staccartene più.</p>
                <p className="divider">···</p>
                <div className="home-center-section-container">
                    <div className="row section-row m-0">
                        <div className="col p-0">
                            <img className="img-fluid home-center-img" src={homekiss}></img>
                        </div>
                        <div className="col p-0">
                            <div className="image-section-text">
                                <h2>Lasciati emozionare</h2>
                                <p>in una location da favola del primo '900 <br/> dove sognare ad occhi aperti.</p>
                                <Link className="btn events-button" to="location">Vedi struttura</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col p-0">
                            <div className="image-section-text">
                                <h2>Realizza il tuo sogno</h2>
                                <p>per noi ogni evento è unico e speciale, <br/> lo realizzeremo proprio come lo volevi tu!</p>
                                <Link className="btn events-button" to="events">Vedi eventi</Link>
                            </div>
                        </div>
                        <div className="col p-0">
                            <img className="img-fluid home-center-img" src={hometable}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="home-login-text">Accedi o registrati</p>
                <p className="home-login-description"> per avere un preventivo e per fissare una visita</p>
                <Link className="btn home-login-button" to="login">Accedi</Link>
            </div>
        </div>
       
    )
}

export default Home;