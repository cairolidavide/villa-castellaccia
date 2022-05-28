import React from "react";
import "./VisitList.css";

const VisitsList = (props) => {

    const visits = props.visits.map((visit, index) => {
        let customer = visit.user;
        let planner = visit.planner;
        let date = visit.date;

        return (
            <div className="col-md-4" key={index}>
                <div className="visit-container">
                    <span className="visit-date">{date.substring(date.indexOf("-") +4,date.indexOf("-") +6)}/{date.substring(date.indexOf("-") +1,date.indexOf("-") +3)}/{date.substring(0, date.indexOf("-"))}</span>
                    <p className="visit-section-text-container">
                        <span className="visit-section-title-name">Nome cliente:</span>
                        <span className="visit-section-text">{customer.name} {customer.surname}</span>
                    </p>
                    <p className="visit-section-text-container">
                        <span className="visit-section-title-name">Ora:</span>
                        <span className="visit-section-text">{date.substring(date.indexOf("-") +7,date.indexOf("-") +9)} : {date.substring(date.indexOf("-") +10,date.indexOf("-") +12)}</span>
                    </p>
                    <p className={props.loggedUser.userType == "wedding-planner" || props.loggedUser.userType =="event-planner" ? "visit-no-display" : "visit-section-text-container" }>
                        <span className="visit-section-title-name">Gestito da:</span>
                        <span className="visit-section-text">{planner.name} {planner.surname}</span>
                    </p>
                </div>
            </div>
        )
    })

    return (
        <div className="row visit-list-container">
            {visits}
        </div>
    )
}

export default VisitsList;