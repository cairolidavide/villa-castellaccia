import React, {useState} from "react";
import "./EventsList.css"
import 'font-awesome/css/font-awesome.min.css';
import SigleEvent from "./SingleEvent";

const EventsList = (props) => {

    const sendRecivedEventId = (id) => {
        props.onResendEventId(id);
    }

    const events = props.events.map((event, index) => {
        return (
           <SigleEvent key={index} event={event} loggedUser={props.loggedUser} onSendEventId={sendRecivedEventId}/>
        )
    })

    return (
        <div className="row">
            {events}
        </div>
    )
}

export default EventsList;