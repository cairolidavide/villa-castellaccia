import axios from "axios";
import React, { useState, useEffect } from "react";
import CustomerSingleVisit from "./CustomerSingleVisit";
import "./CustomerVisitDock.css";

const CustomerVisitDock = (props) => {
    const [visits, setVisits] = useState([]);
    const [plannerList, setPlannerList] = useState([]);
    const [selectorState, setSelectorState] = useState ("1");
    const [selectorTypeEvent, setSelectorTypeEvent] = useState("")
    const [selectedPlanner, setSelectedPlanner] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [plannerFreeHours, setPlannerFreeHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState("");
    const [formSection, setFormSection] = useState("1");
    const [customerNewVisit, setCustomerNewVisit] = useState({});
    const [visitResultMessage, setVisitResultMessage] = useState("");
    const [deletedVisit, setDeletedVisit] = useState({});
    
    const hoursArray = ["9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30"];

    const getCustomerNextVists = () => {
        axios.get(`${props.LINK}/visits/nextVisit?userId=${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setVisits(res.data);
        })
    }

    const getPlanners = (type) => {
        axios.get(`${props.LINK}/users?userType=${type}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let returnedPlanners = res.data;
            setPlannerList(returnedPlanners);
        })
    }

    const getPlannerDailyVisit = () => {
        axios.get(`${props.LINK}/visits/plannerVisits?plannerId=${selectedPlanner}&date=${selectedDate}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let plannersDailyVisit = res.data;
            if (plannersDailyVisit.length > 0) {
                    let visitHours = [];
                for (let visit of plannersDailyVisit) {
                    let date = visit.date;
                    visitHours.push((date.substring(date.indexOf("-") +7,date.indexOf("-") +9)) + ":" + (date.substring(date.indexOf("-") +10,date.indexOf("-") +12)));
                }
                let freeHours = [];
                for (let hour of hoursArray) {
                    for (let plannerHour of visitHours) {
                        if (hour != plannerHour) {
                            freeHours.push(hour);
                        }
                    }
                }
                setPlannerFreeHours(freeHours);
            } else {
                setPlannerFreeHours(hoursArray);
            }
        })
    }
    
    const cleanForm = () => {
        setPlannerList([]);
        setSelectorTypeEvent("");
        setSelectedPlanner(0);
        setSelectedDate("");
        setPlannerFreeHours([]);
        setSelectedHour("");
        setCustomerNewVisit({});
        setVisitResultMessage("");
        setFormSection("1")
    }

    const saveVisit = () => {
        let visit = {
            user : props.loggedUser,
            planner : {
                id : selectedPlanner
            },
            date : selectedDate + "T" + selectedHour
        }
        axios.post(`${props.LINK}/visits`, visit, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setCustomerNewVisit(res.data);
            setVisitResultMessage("Appuntamento aggiunto con successo");
            setTimeout(cleanForm, 6000);
        })
        .catch(error => {
            setVisitResultMessage("Qalcosa è andato storto, riprova");
            setTimeout(cleanForm, 6000);
        })
    }

    const deleteVisit = (id) => {
        axios.delete(`${props.LINK}/visits?visitId=${id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setDeletedVisit(res.data);
        })
        .catch(error => {
            alert("Qualcosa è andato storto, riprova");
        })
    }
   
    useEffect(() => {
        if (props.loggedUser.userType == "customer") {
            getCustomerNextVists();
        }
    }, [props.loggedUser.userType, customerNewVisit, deletedVisit])

    const listOfCustomerVisits = visits.map((visit, index) => {
        return (
            <CustomerSingleVisit key={index} visit={visit} onSendDeletedVisitId={deleteVisit}/>
        )
    })

    return (
        <div>
            <div className="admin-visits-selector-container">
                <div className="admin-visits-selector">
                    <button className={selectorState == "1" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("1")}}>LE MIE VISITE</button>
                    <button className={selectorState == "2" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("2")}}>RICHIEDI VISITA</button>
                </div>
            </div>
            <div className={selectorState == "1" ? "customer-visit-list-container" : "customer-visit-no-display"}>
                <div className="row">
                    {listOfCustomerVisits}
                </div>
            </div>
            <div className={selectorState == "2" ? "" : "customer-visit-no-display"}>
                <form className="new-visit-form">
                    <div className={formSection == "1" ? "" : "customer-visit-no-display"}>
                        <div className={selectorTypeEvent == "wedding" || selectorTypeEvent == "event" ? "customer-visit-no-display" : ""}>
                            <p className="visit-label-text">Cosa vorresti fare?</p>
                            <button className="visit-form-button" onClick={(e) => {e.preventDefault(); getPlanners("event-planner"); setSelectorTypeEvent("event")}}>EVENTO</button>
                            <button className="visit-form-button" onClick={(e) => {e.preventDefault(); getPlanners("wedding-planner"); setSelectorTypeEvent("wedding")}}>MATRIMONIO</button>
                        </div>
                        <div className={selectorTypeEvent == "wedding" ? "" : "customer-visit-no-display"}>
                            <label className="visit-label-text">Scegli Wedding Planner:</label><br/>
                            <select className="input-visit-form" onChange={(e) => {setSelectedPlanner(e.target.value)}}>
                                <option>--seleziona un organizzaotre</option>
                                {plannerList.map((planner, index) => {
                                    return (
                                        <option key={index} value={planner.id}>{planner.name} {planner.surname}</option>
                                    )
                                })}
                            </select><br/>
                        </div>
                        <div className={selectorTypeEvent == "event" ? "" : "customer-visit-no-display"}>
                            <label className="visit-label-text">Scegli Event Planner:</label><br/>
                            <select className="input-visit-form" onChange={(e) => {setSelectedPlanner(e.target.value)}}>
                                    <option>--seleziona un organizzaotre</option>
                                {plannerList.map((planner, index) => {
                                    return (
                                        <option key={index} value={planner.id}>{planner.name} {planner.surname}</option>
                                    )
                                })}
                            </select><br/>
                        </div>
                        <button className={selectorTypeEvent == "" ? "customer-visit-no-display" : "visit-form-button"} onClick={(e) => {e.preventDefault(); setSelectorTypeEvent("")}}>CAMBIA TIPO DI EVENTO</button>
                        <button className={selectorTypeEvent == "" || selectedPlanner == "" ? "customer-visit-no-display" : "visit-form-button"}  onClick={(e) => {e.preventDefault(); setFormSection("2")}}>AVANTI</button><br/>
                    </div>
                    <div className={formSection == "2" ? "" : "customer-visit-no-display"}>
                        <label className="visit-label-text">Scegli una data</label><br/>
                        <input className="input-visit-form" type="date" value={selectedDate} onChange={(e) => {setSelectedDate(e.target.value)}}></input>
                        <button className={selectedDate == "" ? "customer-visit-no-display" : "visit-form-button"} onClick={(e) => {e.preventDefault(); getPlannerDailyVisit(); setFormSection("3");}}>VEDI ORARI DISPONIBILI</button>
                        <p className={selectedDate == "" ? "" : "customer-visit-no-display"}>Scegli una data per proseguire</p>
                    </div>
                    <div className={formSection == "3" ? "" : "customer-visit-no-display"}>
                        <div>
                            <p className="visit-label-text">Scegli un orario:</p>
                            <div className="row">
                                {plannerFreeHours.map((hour, index) => {
                                    return (
                                        <div key={index} className="col-3">
                                            <button className="free-hours-visit"  value={hour} onClick={(e) => {e.preventDefault(); setSelectedHour(e.target.value); setFormSection("4")}}>{hour}</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <p>Le visite hanno durata di 1 ora dalle 9:30 alle 19.30</p>
                            <button className="visit-form-button" onClick={(e) => {e.preventDefault(); setFormSection("2")}}>CAMBIA DATA</button>
                        </div>
                    </div>
                    <div className={formSection == "4" ? "" : "customer-visit-no-display"}>
                        <p className="visit-label-text">RIEPILOGO:</p>
                        <div className="recap-container">
                            <div>
                                <p className="recap-title">Appuntamento per il giorno</p>
                                <p className="recap-content">{selectedDate.substring(selectedDate.indexOf("-") +4,selectedDate.indexOf("-") +6)}/{selectedDate.substring(selectedDate.indexOf("-") +1,selectedDate.indexOf("-") +3)}/{selectedDate.substring(0, selectedDate.indexOf("-"))}</p>
                                <p className="recap-title">alle ore</p>
                                <p className="recap-content">{selectedHour}</p>
                                <button className="visit-form-button" onClick={(e) => {e.preventDefault(); setFormSection("3");}}>CAMBIA ORARIO</button>
                            </div>
                        </div>
                        <button className="visit-form-button" onClick={(e) => {e.preventDefault(); cleanForm();}}>ANNULLA</button>
                        <button className="visit-form-button" onClick={(e) => {e.preventDefault(); setFormSection("5"); saveVisit()}}>PRENOTA</button>
                    </div>
                    <div className={formSection == "5" ? "" : "customer-visit-no-display"}>
                        <div className="customer-new-visit-form">
                            <div className={visitResultMessage != "" ? "" : "customer-visit-no-display"}>
                                <p className="visit-result-text">{visitResultMessage}</p>
                            </div>
                        </div>
                    </div>      
                </form>
            </div>
        </div>
    ) 
}

export default CustomerVisitDock;