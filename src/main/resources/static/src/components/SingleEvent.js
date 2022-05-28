import React, {useState} from "react";
import "./EventsList.css";
import 'font-awesome/css/font-awesome.min.css';
import rings from "../images/rings.png";
import cocktail from "../images/cocktail.png"

const SigleEvent = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    
    let profile = props.event.profile;
    let planner = profile.planner;
    let customer = profile.user;
    let date = props.event.date;

    const sendEventId = (id) => {
        props.onSendEventId(id);
    }

    return (
        <div className={showDescription ? "col-lg-8" : "col-lg-4"} key={props.event.id}>
            <div className="event-container-position">
                <div className={showDescription ? "event-container-resized" : "event-container"}>
                <p className="event-date">{date.substring(date.indexOf("-") +4,date.indexOf("-") +6)}/{date.substring(date.indexOf("-") +1,date.indexOf("-") +3)}/{date.substring(0, date.indexOf("-"))}</p>
                <p className="event-title">{props.event.title}</p>
                    <div className={showDetails ? "event-part-no-display" : (showDescription ? "event-part-no-display" : "event-details")}>
                        <p className="type-event-image-container">
                            <img className={planner.userType == "wedding-planner" ? "event-type-image" : "event-part-no-display"} src={rings}></img>
                            <img className={planner.userType == "event-planner" ? "event-type-image" : "event-part-no-display"} src={cocktail}></img>
                        </p> 
                        <div className="event-details-text-container">
                            <p>
                                <span className="event-section-title-name">Ora:</span>
                                <span className="event-section-text">{date.substring(date.indexOf("-") +7,date.indexOf("-") +9)} : {date.substring(date.indexOf("-") +10,date.indexOf("-") +12)}</span>
                            </p>
                            <p>
                                <span className="event-section-title-name">Cliente:</span>
                                <span className="event-section-text">{customer.name} {customer.surname}</span>
                            </p>
                            <p>
                                <span className="event-section-title-name">Costo:</span>
                                <span className="event-section-text">{props.event.price} €</span>
                            </p>
                            <p>
                                <span className="event-section-title-name">Gestito da:</span>
                                <span className="event-section-text">{planner.name} {planner.surname}</span>
                            </p>
                        </div>
                    </div>
                    <div className={showDetails ? (showDescription ? "event-part-no-display" : "profile-details") : "event-part-no-display"}>
                        <p>
                            <span className="event-section-title-name">Partecipanti:</span>
                            <span className="event-section-text">{profile.guests}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Aree utilizzate:</span>
                            <span className="event-section-text">{profile.areas}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Catering:</span>
                            <span className="event-section-text">{profile.catering}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Utilizzo chiesa:</span>
                            <span className="event-section-text">{profile.church ? "Si" : "No"}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Preparazione in Villa:</span>
                            <span className="event-section-text">{profile.preparation ? "Si" : "No"}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Camere prenotate:</span>
                            <span className="event-section-text">{profile.rooms}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Fascia oraria:</span>
                            <span className="event-section-text">{profile.evening ? "Serale" : "Diurno"}</span>
                        </p>
                        <p>
                            <span className="event-section-title-name">Fuochi d'artificio:</span>
                            <span className="event-section-text">{profile.fireworks ? "Si" : "No"}</span>
                        </p>
                    </div>
                    <div className={showDescription ? "profile-description" : "event-part-no-display"}>
                            <p className="event-section-title-name">Descrizione evento:</p>
                        <div className="event-description-text-container">
                            <p className="event-description-text">{profile.description}</p>
                        </div>
                    </div>
                    <div className="event-section-navigation-container">
                        <button value={props.event.id} className={props.loggedUser.userType == "customer" ? "event-part-no-display" : (showDetails ? "event-part-no-display" : (showDescription ? "event-part-no-display" : "event-section-navigation"))} onClick={(e) => {e.preventDefault(); sendEventId(e.target.value)}}>Modifica</button>
                        <button className={showDetails ? "event-part-no-display" : (showDescription ? "event-part-no-display" : "event-section-navigation")} onClick={(e) => {e.preventDefault(); setShowDetails(true)}}>Vedi dettagli</button>
                        <button className={showDetails ? (showDescription ? "event-part-no-display" : "event-section-navigation") : "event-part-no-display"} onClick={(e) => {e.preventDefault(); setShowDetails(false)}}>Indietro</button>
                        <button className={showDetails ? (showDescription ? "event-part-no-display" : "event-section-navigation") : "event-part-no-display"} onClick={(e) => {e.preventDefault(); setShowDescription(true)}}>Vedi descrizione</button>
                        <button className={showDescription ? "event-section-navigation" : "event-part-no-display"}onClick={(e) => {e.preventDefault(); setShowDescription(false)}}>Indietro</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigleEvent;