import React, {useState} from "react";
import "./SingleService.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleService = (props) => {
    const [modifyService, setModifyService] = useState(false);
    const [modifiedPrice, setModifiedPrice] = useState(null);
    const [modifiedDiscount, setModifiedDiscount] = useState(null);


    const getServiceName = (name) => {
        if (name == "base-price") {
            return "Prezzo base";
        } else if (name == "at-evening") {
            return "Serale";
        } else if (name == "church") {
            return "Utilizzo chiesa";
        } else if (name == "area") {
            return "Unitario area";
        } else if (name == "wedding-room") {
            return "Stanza sposi";
        } else if (name == "room") {
            return "Unitario stanza";
        } else if (name == "preparation") {
            return "Preparazione in villa";
        } else if (name == "fireworks") {
            return "Fuochi d'artificio";
        }
    }

    const sendModifiedValues = () => {
        let modifiedService = {
            id : props.service.id,
            name : props.service.name,
            price : modifiedPrice == null ? props.service.price : modifiedPrice,
            discount : modifiedDiscount == null ? props.service.discount : modifiedDiscount
        }
        props.onSendModifiedValues(modifiedService);
    }

    return (
        <div className="service-container">
            <div className="row">
                <div className="col-4">
                    <div className="service-section-container">
                        <p>{getServiceName(props.service.name)}</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className={modifyService ? "service-input-margin" : "service-section-container"}>
                        <p className={modifyService ? "service-no-display" : ""}>{props.service.price} €</p>
                        <input className={modifyService ? "service-input" : "service-no-display"} defaultValue={props.service.price} type="number" onChange={(e) => {setModifiedPrice(e.target.value)}}></input><span className={modifyService ? "service-input-span" : "service-no-display"}> €</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className={modifyService ? "service-input-margin" : "service-section-container"}>
                        <p className={modifyService ? "service-no-display" : ""}>{props.service.discount} %</p>
                        <input className={modifyService ? "service-input" : "service-no-display"} defaultValue={props.service.discount} type="number" onChange={(e) => {setModifiedDiscount(e.target.value)}}></input><span className={modifyService ? "service-input-span" : "service-no-display"}> %</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="service-button-container">
                        <button className={modifyService ? "service-no-display" : "service-button"} onClick={() => {setModifyService(true)}}>Modifica</button>
                        <button className={modifyService ? "service-button" : "service-no-display"} onClick={() => {setModifyService(false); sendModifiedValues()}}>Salva</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleService;