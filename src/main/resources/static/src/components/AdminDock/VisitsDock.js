import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "./VisitsAndEventsDock.css";
import axios from "axios";
import VisitsList from "../VisitsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faCalendarWeek, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const VisitsDock = (props) => {

    const [visits, setVisits] = useState([]);
    const [selectorState, setSelectorState] = useState("1");
    const [searchByDate, setSearchByDate] = useState("date");
    const [date, setDate] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");

    
    const getNextVisits = () => {
        axios.get(`${props.LINK}/visits/next`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visits = res.data;
            setVisits(visits);
        })
    }

    const getAllVisits = () => {
        axios.get(`${props.LINK}/visits`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visits = res.data;
            setVisits(visits);
        })
    }

    const getVisitByDate = () => {
        axios.get(`${props.LINK}/visits/date?date=${date}`,  {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visits = res.data;
            setVisits(visits);
            setDate("");
        })
    }

    const getVisitByDateRange = () => {
        axios.get(`${props.LINK}/visits/range?firstDate=${firstDate}&secondDate=${secondDate}`,  {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let visits = res.data;
            setVisits(visits);
            setFirstDate("");
            setSecondDate("");
        })
    }
    
    useEffect(() => {
        let reloadVisit;
        if (props.loggedUser.userType == "admin") {
            if (selectorState == "1") {
                reloadVisit = setInterval(getNextVisits(), 3600000);
            } else if(selectorState == "2"){
                getAllVisits();
            } else {
                setVisits([]);
            }
        } else if (props.loggedUser.userType !== "admin") {
            clearInterval(reloadVisit);
        }
    }, [selectorState])
    
    return (
        <div>
            <div className="admin-visits-selector-container">
                <div className="admin-visits-selector">
                    <button className={selectorState == "1" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("1")}}>PROSSIME VISITE</button>
                    <button className={selectorState == "2" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("2")}}>TUTTE LE VISITE</button>
                    <button className={selectorState == "3" ? "admin-visit-selector-active" : "admin-visit-selector-notactive"} onClick={(e) => {setSelectorState("3")}}>CERCA</button>
                </div>   
            </div>
            <div className={selectorState == "3" ? "" : "visit-dock-no-display"}>
                <div className="select-visit-search-type-button-container">
                    <button className={searchByDate == "date" ? "select-visit-search-type-button-selected" : "select-visit-search-type-button"} onClick={() => {setSearchByDate("date");}}><FontAwesomeIcon icon={faCalendarDay}/></button>
                    <button className={searchByDate == "range" ? "select-visit-search-type-button-selected" : "select-visit-search-type-button"} onClick={() => {setSearchByDate("range");}}><FontAwesomeIcon icon={faCalendarWeek}/></button>
                </div>
                <div className={searchByDate == "date" ? "search-visit-by-date": "visit-dock-no-display"}>
                    <form>
                        <label className="search-visit-label">Data:</label>
                        <input value={date} className="search-visit-input" type="datetime-local" onChange={(e) => {setDate(e.target.value)}}></input>
                        <button className="btn search-visit-button" onClick={(e) => {e.preventDefault(); getVisitByDate()}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </form>
                </div>
                <div className={searchByDate == "range" ? "search-visit-by-date": "visit-dock-no-display"}>
                    <form>
                        <label className="search-visit-label">Prima data:</label>
                        <input value={firstDate}className="search-visit-input" type="datetime-local" onChange={(e) => {setFirstDate(e.target.value)}}></input>
                        <label className="search-visit-label">Seconda data:</label>
                        <input value={secondDate} className="search-visit-input" type="datetime-local" onChange={(e) => {setSecondDate(e.target.value)}}></input>
                        <button className="btn search-visit-button" onClick={(e) => {e.preventDefault(); getVisitByDateRange()}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                    </form>
                </div>
            </div>
            <VisitsList visits={visits} loggedUser={props.loggedUser}/>
        </div>
    )
}

export default VisitsDock;