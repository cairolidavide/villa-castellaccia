import axios from "axios";
import React, {useState, useEffect} from "react";
import "./VisitPlannerDock.css";
import VisitsList from "../VisitsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const VisitPlannerDock = (props) => {
    const [selectorState, setSelectorState] = useState("1");
    const [visits, setVisits] = useState([]);
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");

    const getNextVisits = () => {
        axios.get(`${props.LINK}/visits/plannerNextVisit?plannerId=${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visitList = res.data;
            setVisits(visitList);
        })
    }

    const getAllVisits = () => {
        axios.get(`${props.LINK}/visits/plannerAllVisit?plannerId=${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visitList = res.data;
            setVisits(visitList);
        })
    }

    const getVisitByDateRange = () => {
        axios.get(`${props.LINK}/visits/rangePlannerVisit?plannerId=${props.loggedUser.id}&firstDate=${firstDate}&secondDate=${secondDate}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visitList = res.data;
            setVisits(visitList);
        })
    }

    useEffect(() => {
        if (props.loggedUser.userType == "wedding-planner" || props.loggedUser.userType == "event-planner") {
            if (selectorState == "1") {
                getNextVisits();
            } else if (selectorState == "2") {
                getAllVisits();
            } else if (selectorState == "3") {
                setVisits([]);
            }
        }
    }, [props.loggedUser, selectorState])

    return (
        <div>
            <div className="admin-visits-selector-container">
                <div className="admin-visits-selector">
                    <button className={selectorState == "1" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("1")}}>PROSSIME VISITE</button>
                    <button className={selectorState == "2" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("2")}}>TUTTE LE MIE VISITE</button>
                    <button className={selectorState == "3" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("3")}}>CERCA</button>
                </div>  
            </div>
            <div className={selectorState == "3" ? "": "visit-planner-no-display"}>
                <form>
                    <label className="search-visit-label">Prima data:</label>
                    <input value={firstDate}className="search-visit-input" type="datetime-local" onChange={(e) => {setFirstDate(e.target.value)}}></input>
                    <label className="search-visit-label">Seconda data:</label>
                    <input value={secondDate} className="search-visit-input" type="datetime-local" onChange={(e) => {setSecondDate(e.target.value)}}></input>
                    <button className="btn search-visit-button" onClick={(e) => {e.preventDefault(); getVisitByDateRange()}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
            </div>
            <VisitsList visits={visits} loggedUser={props.loggedUser}/>
        </div>
    )
}

export default VisitPlannerDock;