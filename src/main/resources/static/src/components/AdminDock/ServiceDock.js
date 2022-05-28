import axios from "axios";
import React, {useEffect, useState} from "react";
import SingleService from "../SingleService";
import "./ServiceDock.css";


const ServiceDock = (props) => {
    const [serviceList, setServiceList] = useState([]);
    const [recivedService, setRecivedService] = useState({});

    const getAllService = () => {
        axios.get(`${props.LINK}/services`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let services = res.data;
            setServiceList(services);
        })
    }

    const modifyPriceAndDicount = (service) => {
        axios.put(`${props.LINK}/services`, service, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setRecivedService(res.data);
        })
        .catch(error => {
            alert(error.body);
        })
    }

    useEffect(() => {
        if (props.loggedUser.userType == "admin") {
            getAllService();
        }
    }, [props.loggedUser, recivedService])

    const listOfService = serviceList.map((service, index) => {
        return (
            <div key={index}>
                <SingleService service={service} onSendModifiedValues={modifyPriceAndDicount}/>
            </div>
        )
    })

    return (
        <div>
            <div className="service-title">
                <span>MODIFICA I TUOI SERVIZI:</span>
            </div>
            <div className="service-table-title">
                <div className="row">
                    <div className="col-4">
                        <p>Servizio:</p>
                    </div>
                    <div className="col-4">
                        <p>Prezzo:</p>
                    </div>
                    <div className="col-2">
                        <p>Sconto:</p>
                    </div>
                    <div className="col-2">
                        
                    </div>
                </div>
            </div>
            
            {listOfService}
        </div>
    )
}

export default ServiceDock;