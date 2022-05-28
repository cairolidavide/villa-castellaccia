import axios from "axios";
import React, {useEffect, useState} from "react";
import "./AdminDock.css";
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import PlannerList from "../PlannerList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const AddPlannerDock = (props) => {
    const [plannerName, setPlannerName] = useState("");
    const [plannerSurname, setPlannerSurname] = useState("");
    const [plannerPhoneNumber, setPlannerPhoneNumber] = useState("");
    const [plannerEmail, setPlannerEmail] = useState("");
    const [plannerPassword, setPlannerPassword] = useState("");
    const [plannerType, setPlannerType] = useState("event-planner");
    const [weddingPlannerList, setWeddingPlannerList] = useState([]);
    const [eventPlannerList, setEventPlannerList] = useState([]);
    const [newAddedPlanner, setNewAddedPlanner] = useState({});
    const [deletedPlanner, setDeletedPlanner] = useState({});
    const [showAddModule, setShowAddModule] = useState(false);

    const getWeddingPlannerList = () => {
        axios.get(`${props.LINK}/users?userType=wedding-planner`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
           let weddingPlanners = res.data;
           setWeddingPlannerList(weddingPlanners);
        })
    }

    const getEventPlannerList = () => {
        axios.get(`${props.LINK}/users?userType=event-planner`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let eventPlanners = res.data;
            setEventPlannerList(eventPlanners);
        })
    }

    const addNewUser = (e) => {
        e.preventDefault();
        let planner = {
            name: plannerName,
            surname: plannerSurname,
            phoneNumber: plannerPhoneNumber,
            email: plannerEmail,
            password: plannerPassword,
            userType: plannerType
        }
        axios.post(`${props.LINK}/users/newUser`, planner)
        .then(res => {
            let returnedPlanner = res.data;
            saveReturnedPlanner(returnedPlanner);
        })
        .catch(error => {
            alert(error.body);
        })
    }

    const deleteUser = (id) => {
        axios.delete(`${props.LINK}/users?id=${id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let deletedUser = res.data;
            setDeletedPlanner(deletedUser);
        })
        .catch(error => {
            alert(error.response.data);
        })
    }

    const saveReturnedPlanner = (planner) => {
        setNewAddedPlanner(planner);
        setPlannerName("");
        setPlannerSurname("");
        setPlannerPhoneNumber("");
        setPlannerEmail("");
        setPlannerPassword("");
        setPlannerType("event-planner");
    }

    useEffect(() => {
        if (props.loggedUser.userType == "admin") {
            getWeddingPlannerList();
            getEventPlannerList();
        } else if (newAddedPlanner.userType == "wedding-planner" || deletedPlanner.userType == "wedding-planner") {
            getWeddingPlannerList();
        } else if (newAddedPlanner.userType == "event-planner" || deletedPlanner.userType == "event-planner") {
            getEventPlannerList();
        }
    }, [props.loggedUser, newAddedPlanner, deletedPlanner])

    return (
        <div id="admin-dock-container" >
            <div className="add-planner-row">
                <button className={ showAddModule ? "admin-dock-no-display" : "show-add-planner-form-button"} onClick={() => {setShowAddModule(true)}}><FontAwesomeIcon icon={faUserPlus}/></button>
                <div>
                    <div id="add-planner-container" className={showAddModule ? "" : "admin-dock-no-display"}>
                        <p className="add-planner-close-form" onClick={() => {setShowAddModule(false)}}><FontAwesomeIcon icon={faCircleXmark} /></p>
                        <p className="admin-dock-section-title">Aggiungi un nuovo organizzatore:</p>
                        <div className="add-planner-form-cotainer">
                            <form>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Nome</label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" value={plannerName} required onChange={(e) => {setPlannerName(e.target.value)}}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Cognome</label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" value={plannerSurname} required onChange={(e) => {setPlannerSurname(e.target.value)}}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Telefono</label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" value={plannerPhoneNumber} required onChange={(e) => {setPlannerPhoneNumber(e.target.value)}}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" value={plannerEmail} required onChange={(e) => {setPlannerEmail(e.target.value)}}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Password</label>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" value={plannerPassword} required onChange={(e) => {setPlannerPassword(e.target.value)}}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-3 add-planner-label">
                                                <label>Tipo</label>
                                            </div>
                                            <div className="col-9">
                                                <select type="text" required onChange={(e) => {setPlannerType(e.target.value)}}>
                                                    <option defaultValue="event-planner">Event Planner</option>
                                                    <option value="wedding-planner">Wedding Planner</option>    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button disabled={props.loggedUser == "" ?  true : false} type="submit" className="btn create-planner-button" onClick={(e) => {addNewUser(e); setShowAddModule(false)}}>CREA</button>
                                    </div>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <p className="admin-dock-section-title">I tuoi organizzatori:</p>
                <div className="planner-list-title">Wedding Planners:
                    <PlannerList plannerList={weddingPlannerList} onSendDeletedUserId={deleteUser}/>
                </div>
                <div className="planner-list-title">Event Planners:
                    <PlannerList plannerList={eventPlannerList} onSendDeletedUserId={deleteUser}/>
                </div>
            </div>
        </div>
    )
}

export default AddPlannerDock;