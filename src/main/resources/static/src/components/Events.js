import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import "./Events.css"
import padiglione from "../images/padiglione.png";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "react-bootstrap";
import eventsImages1 from "../images/events-images/eventsImages1.png";
import eventsImages2 from "../images/events-images/eventsImages2.png";
import eventsImages3 from "../images/events-images/eventsImages3.png";
import eventsImages4 from "../images/events-images/eventsImages4.png";
import eventsImages5 from "../images/events-images/eventsImages5.png";
import eventsImages6 from "../images/events-images/eventsImages6.png";
import eventsImages7 from "../images/events-images/eventsImages7.png";
import eventsImages8 from "../images/events-images/eventsImages8.jpeg";

const Events = () => {
    return (
        <div>
            <div className="section-title">
                <p>Un ricordo è per sempre</p>
            </div>
            <div className="event-header-img">
                <img className="img-fluid" src={padiglione}></img>
            </div>
            <div className="events-content-container">
                <p className="event-message-text">Nulla è più prezioso</p>
                <p className="events-content-page-text">Nel vostro giorno più bello, sarete voi i padroni di casa, godendo in compagnia dei
                     vostri ospiti della villa e del parco, in totale esclusività. Non avrete bisogno di
                      spostarvi e di affannarvi: il parcheggio e' interno, la chiesetta di Sant’ Oliva,
                       una chicca in mezzo agli ulivi, quasi un sogno... la zona della piscina per
                        accogliere gli invitati con un aperitivo mentre voi vi aggirate nel parco per le 
                        foto, l’elegante salone o il giardino inglese per il pranzo o la cena, e poi dove
                         si vuole, nel proseguo della festa... Ogni occasione può essere personalizzata
                          e curata dalla Event Planner presente in struttura che soddisferà qualsiasi
                           desiderio con professionalità per eventi unici e indimenticabili.</p>
            </div>
            <div className="event-login-button-container">
                <Link className="btn event-login-button" to="/login">PRENOTA UNA VISITA</Link>
            </div>
            
            <div className="event-photo-container">
            <p className="event-carousel-text">Alcuni dei nostri eventi</p>
                <Carousel fade={true}>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages1}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages2}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages3}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages4}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages5}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages6}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages7}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid rounded-img" src={eventsImages8}></img>
                    </CarouselItem>
                </Carousel>
            </div>
        </div>
    )
}

export default Events;