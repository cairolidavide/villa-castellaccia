import React, {useEffect, useState} from "react";
import UserList from "../UserList";
import "./UsersDock.css";
import axios from "axios";

const UsersDock = (props) => {
    const [eventsUsers, setEventsUsers] = useState([]);
    const [visitsUsers, setVisitsUsers] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [selectorState, setSelectorState] = useState("1");

    const getVisitsUsers = () => {
        axios.get(`${props.LINK}/users/visitsUsers`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let recivedVisitsUsers = res.data;
            setVisitsUsers(recivedVisitsUsers);
        })
    }

    const getEventsUsers = () => {
        axios.get(`${props.LINK}/users/eventsUsers`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let recivedEventsUsers = res.data;
            setEventsUsers(recivedEventsUsers);
        })
    }

    const getAllCustomers = () => {
        axios.get(`${props.LINK}/users?userType=customer`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let customers = res.data;
            setCustomerList(customers);
        })
    }

    useEffect(() => {
        let reloadEvents;
        if (props.loggedUser.userType == "admin") {
            if (selectorState == "1") {
                reloadEvents = setInterval(getVisitsUsers(), 3600000);
            } else if(selectorState == "2"){
                reloadEvents = setInterval(getEventsUsers(), 3600000);
            } else {
                getAllCustomers();
            }
        } else if (props.loggedUser.userType !== "admin") {
            clearInterval(reloadEvents);
        }
    }, [props.loggedUser, selectorState])


    return (
        <div>
             <div className="user-selector-container">
                <div className="user-selector">
                    <button className={selectorState == "1" ? "user-selector-active" : "user-selector-notactive"} onClick={(e) => {setSelectorState("1")}}>UTENTI CON VISITE</button>
                    <button className={selectorState == "2" ? "user-selector-active" : "user-selector-notactive"} onClick={(e) => {setSelectorState("2")}}>UTENTI CON EVENTI</button>
                    <button className={selectorState == "3" ? "user-selector-active" : "user-selector-notactive"} onClick={(e) => {setSelectorState("3")}}>TUTTI GLI UTENTI</button>
                </div>   
            </div>
            <div className={selectorState == "1" ? "users-dock-section-title" : "user-no-display"}> 
                <UserList userList={visitsUsers}></UserList>
            </div>
            <div className={selectorState == "2" ? "users-dock-section-title" : "user-no-display"}>
                <UserList userList={eventsUsers}></UserList>
            </div>
            <div className={selectorState == "3" ? "users-dock-section-title" : "user-no-display"}>
                <UserList userList={customerList}></UserList>
            </div>
        </div>
    )
}

export default UsersDock;