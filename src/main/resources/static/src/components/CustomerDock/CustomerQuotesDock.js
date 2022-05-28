import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CustomerQuotesDock.css";

const CustomerQuotesDock = (props) => {
    const [basePrice, setBasePrice] = useState("");
    const [eveningPrice, setEveningPrice] = useState("");
    const [eveningSelectedPrice, setEveningSelectedPrice] = useState(0);
    const [churchPrice, setChurchPrice] = useState("");
    const [churchSelectedPrice, setChurchSelectedPrice] = useState(0);
    const [priceSingleArea, setPriceSignleArea] = useState("");
    const [areaSelectedPrice, setAreaSelectedPrice] = useState(0);
    const [weddingRoomPrice, setWeddingRoomPrice] = useState("");
    const [weddingroomSelectedPrice, setWeddingroomSelectedPrice] = useState(0);
    const [singleRoomPrice, setSingleRoomPrice] = useState("");
    const [roomSelectedPrice, setRoomSelectedPrice] = useState(0);
    const [preparationPrice, setPreparationPrice] = useState("");
    const [preparationSelectedPrice, setPreprationSelectedPrice] = useState(0);
    const [fireworksPrice, setFireworksPrice] = useState("");
    const [fireworksSelectedPrice, setFireworksSelectedPrice] = useState(0);
    const [result, setResult] = useState("");
    const [typeEvent, setTypeEvent] = useState("");
    const [section, setSection] = useState("1");
    const [areaSection, setAreaSection] = useState("1");

    const getPriceList = () => {
        axios.get(`${props.LINK}/services`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let priceList = (res.data);
            for (let service of priceList) {
                if (service.name == "base-price") {
                    setBasePrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "at-evening") {
                    setEveningPrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "church") {
                    setChurchPrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "area") {
                    setPriceSignleArea(service.price-((service.discount/100)*service.price));
                } else if (service.name == "wedding-room") {
                    setWeddingRoomPrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "room") {
                    setSingleRoomPrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "preparation") {
                    setPreparationPrice(service.price-((service.discount/100)*service.price));
                } else if (service.name == "fireworks") {
                    setFireworksPrice(service.price-((service.discount/100)*service.price));
                }
            }
        })
    }

    const cleanForm = () => {
        setEveningSelectedPrice(0);
        setChurchSelectedPrice(0);
        setAreaSelectedPrice(0);
        setWeddingroomSelectedPrice(0);
        setRoomSelectedPrice(0);
        setPreprationSelectedPrice(0)
        setFireworksSelectedPrice(0);
        setResult("");
        setTypeEvent("");
    }

    useEffect(() => {
        if (props.loggedUser.userType == "customer") {
            getPriceList();
        }
    }, [props.loggedUser])

    return (
        <div>
            <div>
                <form>
                    <div>
                        <div className={section == "1" ? "" : "quotes-no-display"}>
                            <p className="quotes-label-text">Scegli il tipo di evento</p>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setTypeEvent("event"); setSection("2")}}>EVENTO GENERICO</button>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setTypeEvent("wedding"); setSection("2")}}>MATRIMONIO</button>
                        </div>
                        <div className={section == "2" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">L'evento sarà la sera?</label>
                            <select className="input-quotes-form" onChange={(e) => {setEveningSelectedPrice(e.target.value)}}>
                                <option value={0}>NO</option>
                                <option value={eveningPrice}>SI</option>
                            </select>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); typeEvent == "wedding" ? setSection("3"): setSection("5")}}>AVANTI</button>
                        </div>
                        <div className={section == "3" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">Vuoi utilizzare la chiesa della villa?</label>
                            <select className="input-quotes-form" onChange={(e) => {setChurchSelectedPrice(e.target.value)}}>
                                <option value={0}>NO</option>
                                <option value={churchPrice}>SI</option>
                            </select>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("4")}}>AVANTI</button>
                        </div>
                        <div className={section == "4" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">Vi preparerete in Villa?</label>
                            <select className="input-quotes-form" onChange={(e) => {setPreprationSelectedPrice(e.target.value)}}>
                                <option value={0}>NO</option>
                                <option value={preparationPrice}>SI</option>
                            </select>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("5")}}>AVANTI</button>
                        </div>
                        <div className={section == "5" ? "" : "quotes-no-display"}>
                            <p className="quotes-label-text">Quali aree della villa vorresti utillizzare?</p>
                            <div className={areaSection == "1" ? "" : "quotes-no-display"}>
                                <label className="quotes-label-text">Parco anteriore?</label>
                                <select className="input-quotes-form" onChange={(e) => {setAreaSelectedPrice(e.target.value)}}>
                                    <option value={0}>NO</option>
                                    <option value={priceSingleArea}>SI</option>
                                </select>
                                <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setAreaSection("2")}}>AVANTI</button>
                            </div>
                            <div className={areaSection == "2" ? "" : "quotes-no-display"}>
                                <label className="quotes-label-text">Parco posterire?</label>
                                <select className="input-quotes-form" onChange={(e) => {setAreaSelectedPrice((parseInt(priceSingleArea) + parseInt(e.target.value)))}}>
                                    <option value={0}>NO</option>
                                    <option value={priceSingleArea}>SI</option>
                                </select>
                                <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setAreaSection("3")}}>AVANTI</button>
                            </div>
                            <div className={areaSection == "3" ? "" : "quotes-no-display"}>
                                <label className="quotes-label-text">Piscina?</label>
                                <select className="input-quotes-form" onChange={(e) => {setAreaSelectedPrice((parseInt(priceSingleArea) + parseInt(e.target.value)))}}>
                                    <option value={0}>NO</option>
                                    <option value={priceSingleArea}>SI</option>
                                </select>
                                <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setAreaSection("4")}}>AVANTI</button>
                            </div>
                            <div className={areaSection == "4" ? "" : "quotes-no-display"}>
                                <label className="quotes-label-text">Padiglione?</label>
                                <select className="input-quotes-form" onChange={(e) => {setAreaSelectedPrice((parseInt(priceSingleArea) + parseInt(e.target.value)))}}>
                                    <option value={0}>NO</option>
                                    <option value={priceSingleArea}>SI</option>
                                </select>
                                <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setAreaSection("5")}}>AVANTI</button>
                            </div>
                            <div className={areaSection == "5" ? "" : "quotes-no-display"}>
                                <label className="quotes-label-text">Uliveto?</label>
                                <select className="input-quotes-form" onChange={(e) => {setAreaSelectedPrice((parseInt(priceSingleArea) + parseInt(e.target.value)))}}>
                                    <option value={0}>NO</option>
                                    <option value={priceSingleArea}>SI</option>
                                </select>
                                <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("6")}}>AVANTI</button>
                            </div>
                        </div>
                        <div className={section == "6" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">Desideri la camera padronale?</label>
                            <select className="input-quotes-form" onChange={(e) => {setWeddingroomSelectedPrice((parseInt(priceSingleArea) + parseInt(e.target.value)))}}>
                                <option value={0}>NO</option>
                                <option value={weddingRoomPrice}>SI</option>
                            </select>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("7")}}>AVANTI</button>
                        </div>
                        <div className={section == "7" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">Desideri altre stanze?</label>
                            <input className="input-quotes-form" type="number" defaultValue={0} min={0} max={4} onChange={(e) => {setRoomSelectedPrice((parseInt(singleRoomPrice) * parseInt(e.target.value)))}}></input>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("8")}}>AVANTI</button>
                        </div>
                        <div className={section == "8" ? "" : "quotes-no-display"}>
                            <label className="quotes-label-text">Desideri i fuochi d'artificio?</label>
                            <select className="input-quotes-form" onChange={(e) => {setFireworksSelectedPrice(e.target.value)}}>
                                <option value={0}>NO</option>
                                <option value={fireworksPrice}>SI</option>
                            </select>
                            <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); setSection("9")}}>AVANTI</button>
                        </div>
                        <div className={section == "9" ? "" : "quotes-no-display"}>
                            <button className="quotes-form-button" onClick={(e) => { e.preventDefault(); setResult((parseInt(basePrice) + parseInt(eveningSelectedPrice) + parseInt(churchSelectedPrice) + parseInt(areaSelectedPrice) + parseInt(weddingroomSelectedPrice) + parseInt(roomSelectedPrice) + parseInt(preparationSelectedPrice) + parseInt(fireworksSelectedPrice))); setSection("10")}}>CALCOLA PREVENTIVO</button>
                        </div>
                    </div>
                </form>
                <div className={section == "10" ? "" : "quotes-no-display"}>
                    <p className="quotes-label-text">Il tuo preventivo è di:</p>
                    <p className="quotes-text">{result} €</p>
                    <button className="quotes-form-button">SCARICA PREVENTIVO</button>
                    <button className="quotes-form-button" onClick={(e) => {e.preventDefault(); cleanForm(); setAreaSection("1");  setSection("1")}}>NUOVO PREVENTIVO</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerQuotesDock;

