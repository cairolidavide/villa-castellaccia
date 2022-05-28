import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Location.css";
import { Carousel, CarouselItem } from "react-bootstrap";
import villa2 from "../images/villa2.jpeg";
import chiesa from "../images/location-images/chiesa.png";
import padronale from "../images/location-images/padronale.png";
import parcoanteriore1 from "../images/location-images/parco-anteriore1.png";
import parcoanteriore2 from "../images/location-images/parco-anteriore2.png";
import parcoanteriore3 from "../images/location-images/parco-anteriore3.png";
import piscina from "../images/location-images/piscina.png";
import porticato from "../images/location-images/porticato.png";
import villa3 from "../images/location-images/villa3.png";
import window from "../images/location-images/window.png";

const Location = () => {
    return (
        <div>
            <div className="section-title">
                <p>Nel verde della Speranza</p>
            </div>
            <div className="location-header-img">
                <img className="img-fluid" src={villa2}></img>
            </div>
            <div className="location-text-container">
                <p className="location-message-text">Un'oasi di eleganza</p>
                <p className="location-content-page-text">Già Dante nella Divina Commedia ne delineò i confini, la Maremma Toscana si estende 
                da Cecina a Tarquinia. Unica per la diversità del suo territorio: dalla montagna con i 
                suoi fitti boschi fino alle dolci colline ricche di pregiati vigneti e caratteristici 
                oliveti dai quali ne derivano prodotti unici al mondo. Ricca di storia e arte, di piccoli 
                paesini che hanno mantenuto caratteristiche medievali e tramandano le proprie tradizioni. 
                Si giunge infine sulle meravigliose coste, dove si alternano lunghe distese di sabbia 
                dorata con baie nascoste e magnifiche scogliere incontaminate. Non manca la buona cucina 
                legata ai prodotti del territorio: semplice, genuina e gustosa. I prodotti tipici maremmani 
                quali l’olio, il vino, i formaggi, le castagne.. fanno da padroni alle nostre tradizioni 
                culinarie conosciute in ogni dove. Il Comune di Gavorrano, entro il quale si erge Villa 
                Castellaccia, si distacca dai clamori costieri (seppur vicini) godendo di una totale 
                immersione nel tranquillo e tradizionale paesaggio rurale Toscano.</p>
            </div>
            <div className="location-carousel-container">
                <p className="location-carousel-text">Alcuni scorci:</p>
                <Carousel fade={true}>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={chiesa}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={padronale}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={parcoanteriore1}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={parcoanteriore2}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={parcoanteriore3}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={piscina}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={porticato}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={villa3}></img>
                    </CarouselItem>
                    <CarouselItem interval={10000}>
                        <img className="img-fluid" src={window}></img>
                    </CarouselItem>
                </Carousel>
            </div>
            <div id="indication-container" className="row">
                <div id="location-indication" className="col-6">
                    <p><span>Per arrivare:</span> Uscita superstrada Aurelia E80 - Giuncarico - prendere direzione - 
                        Ribolla. Dopo circa 1km, si entra in localita' Castellaccia. 300m dopo il cartello 
                        di localita', girare a destra (la prima). Il cancello della villa e' subito alla vostra 
                        destra.</p>
                </div>
                <div id="location-indication-2" className="col-6">
                <p>Via Toscana, 2 <br/> Castellaccia (GR) <br/>58023</p>
                </div>
            </div>
        </div>
    )
}

export default Location;