import React, {useEffect, useState} from "react";
import SingleEvent from "../SingleEvent";
import axios from "axios";
import "./CustomerEventDock.css";

const CustomerEventDock = (props) => {
    const [eventList, setEventList] = useState([]);

    const getCustomerEvents = () => {
        axios.get(`${props.LINK}/events/user/${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setEventList(res.data);
        })
    }
    
    let listOfEvent = eventList.map((event, index) => {
        return (
            <div key={index}>
                <SingleEvent event={event} loggedUser={props.loggedUser}/>
            </div>
        )
    })

    useEffect(() => {
        if (props.loggedUser.userType == "customer") {
            getCustomerEvents();
        }
    }, [props.loggedUser])

    return (
        <div>
            <p className="customer-event-list-title">I tuoi prossimi eventi:</p>
            <div className={eventList.length > 0 ? "customer-event-list" : "customer-event-no-display"}>
                {listOfEvent}
            </div>
            <div className={eventList.length == 0 ? "" : "customer-event-no-display"}>
                <p>Non hai eventi in programma</p>
            </div>
        </div>
    )
}

export default CustomerEventDock;