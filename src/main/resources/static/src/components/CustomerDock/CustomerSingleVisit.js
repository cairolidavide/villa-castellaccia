import React, {useState} from "react";
import "./CustomerSingleVisit.css";

const CustomerSingleVisit = (props) => {

const [showDeleteSection, setShowDeleteSection] = useState("customer-visit-no-display");

const sendDeletedVisitId = (id) => {
    props.onSendDeletedVisitId(id);
}

let planner = props.visit.planner;
let date = props.visit.date;

    return (
        <div className="col-md-4">
            <div className="customer-visit-container">
                <div className={showDeleteSection == "customer-visit-no-display" ? "" : "customer-visit-no-display"}>
                    <span className="customer-visit-date">{date.substring(date.indexOf("-") +4,date.indexOf("-") +6)}/{date.substring(date.indexOf("-") +1,date.indexOf("-") +3)}/{date.substring(0, date.indexOf("-"))}</span>
                    <p className="customer-visit-section-text-container">
                        <span className="customer-visit-section-title-name">Ora:</span>
                        <span className="customer-visit-section-text">{date.substring(date.indexOf("-") +7,date.indexOf("-") +9)} : {date.substring(date.indexOf("-") +10,date.indexOf("-") +12)}</span>
                    </p>
                    <p className="customer-visit-section-text-container">
                        <span className="customer-visit-section-title-name">Organizzatore:</span>
                        <span className="customer-visit-section-text">{planner.name} {planner.surname}</span>
                    </p>
                    <button className="delete-customer-visit" onClick={() => {setShowDeleteSection("customer-secure-delete-visit")}}>DISDICI APPUNTAMENTO</button>
                </div>
                <div className={showDeleteSection}>
                    <div>
                        <p>Sei sicuro di voler disdire l'appuntamento?</p>
                        <button className="delete-customer-visit" value={props.visit.id} onClick={(e) => {sendDeletedVisitId(e.target.value); setShowDeleteSection("customer-visit-no-display");}}>SI</button>
                        <button className="delete-customer-visit" onClick={() => {setShowDeleteSection("customer-visit-no-display")}}>NO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSingleVisit;