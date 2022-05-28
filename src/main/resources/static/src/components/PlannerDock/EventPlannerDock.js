import React, { useEffect, useState } from "react";
import "./EventPlannerDock.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faCalendarWeek, faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import EventsList from "../EventsList";
import axios from "axios";

const EventPlannerDock = (props) => {

    const [selectorState, setSelectorState] = useState("1");
    const [events, setEvents] = useState([]);
    const [searchByDate, setSearchByDate] = useState("date");
    const [date, setDate] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [eventId, setEventId] = useState(0);
    const [showModifyEventForm, setShowModifyEventForm] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventDate, setEventDate] =  useState("");
    const [eventPrice, setEventPrice] = useState(0);
    const [profileId, setProfileId] = useState(0);
    const [profileUser, setProfileUser] = useState({});
    const [profilePlanner, setProfilePlanner] = useState({});
    const [profileGuests, setProfileGuests] = useState("");
    const [profileCatering, setProfileCatering] = useState("");
    const [profileIsInEvening, setIsInEvening] = useState(false);
    const [profileUseChurch, setProfileUseChurch] = useState(false);
    const [profileAreas, setProfileAreas] = useState("");
    const [profileRooms, setProfileRooms] = useState("");
    const [profilePreparation, setProfilePreparation] = useState(false);
    const [profileFireworks, setProfileFireworks] = useState(false);
    const [profileDescriprion, setProfileDescriprion] = useState("");
    const [services, setServices] = useState([]);
    const [planners, setPlanners] = useState([]);
    const [returnedEvent, setReturnedEvent] = useState({});
    const [customersList, setCustomersList] = useState([]);
    const [customer, setCustomer] = useState("");

    const getAllEvent = () => {
        axios.get(`${props.LINK}/events/allPlannerEvent?plannerId=${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setEvents(res.data);
        })
    }

    const getNextEvent = () => {
        axios.get(`${props.LINK}/events/nextPlannerEvent?plannerId=${props.loggedUser.id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setEvents(res.data);
        })
    }

    const getEventByDate = () => {
        axios.get(`${props.LINK}/events/nextPlannerEvent?plannerId=${props.loggedUser.id}&date=${date}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setEvents(res.data);
        })
    }

    const getEventsByDateRange = () => {
        axios.get(`${props.LINK}/events/nextPlannerEvent?plannerId=${props.loggedUser.id}&firstDate=${firstDate}&secondDate=${secondDate}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setEvents(res.data);
        })
    }

    const setRecivedEventId = (id) => {
        setEventId(id);
        getEventById(id);
        setShowModifyEventForm(true);
    }

    const getPlanners = (type) => {
        axios.get(`${props.LINK}/users?userType=${type}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let returnedPlanners = res.data;
            setPlanners(returnedPlanners);
        })
    }

    const getAllServices = () => {
        axios.get(`${props.LINK}/services`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let recivedServices = res.data;
            setServices(recivedServices);
        })
    }

    const getEventById = (id) => {
        axios.get(`${props.LINK}/events/${id}`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let event = res.data;
            let profile = event.profile;
            setEventTitle(event.title);
            setEventDate(event.date);
            setEventPrice(event.price);
            setProfileId(profile.id);
            setProfileUser(profile.user);
            setProfilePlanner(profile.planner);
            let planner = profile.planner;
            getPlanners(planner.userType);
            setProfileGuests(profile.guests);
            setProfileCatering(profile.catering);
            setIsInEvening(profile.evening);
            setProfileUseChurch(profile.church);
            setProfileAreas(profile.areas);
            setProfileRooms(profile.rooms);
            setProfilePreparation(profile.preparation);
            setProfileFireworks(profile.fireworks);
            setProfileDescriprion(profile.description);
        })
        .catch(error => {
            alert(error.body);
            setShowModifyEventForm(false);
        })
    }

    const modifyEvent = () => {
        let event = {
            id : eventId,
            title : eventTitle,
            date : eventDate,
            price : eventPrice,
            profile : {
                id : profileId,
                areas: profileAreas,
                catering: profileCatering,
                church : profileUseChurch,
                description : profileDescriprion,
                evening : profileIsInEvening,
                fireworks : profileFireworks,
                guests : profileGuests,
                preparartion : profilePreparation,
                rooms : profileRooms,
                planner : profilePlanner,
                user : profileUser
            }
        }
        axios.put(`${props.LINK}/events`, event, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let returnedEvent = res.data;
            setReturnedEvent(returnedEvent);
        })
    }

    const clear = () => {
        setEventTitle("");
        setEventDate("");
        setEventPrice(0);
        setProfileId("");
        setProfileUser("");
        setProfilePlanner("");
        setProfileGuests("0");
        setProfileCatering("");
        setIsInEvening(false);
        setProfileUseChurch(false);
        setProfileAreas("");
        setProfileRooms("");
        setProfilePreparation(false);
        setProfileFireworks(false);
        setProfileDescriprion("");
    }

    const getAllUsers = () => {
        axios.get(`${props.LINK}/users?userType=customer`, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setCustomersList(res.data);
        })
    }

    const calculatePrice = () => {
        getAllServices();
        let sum = 0;
        let basePrice = 0;
        let eveningPrice = 0;
        let churchPrice = 0;
        let singleAreaPrice = 0;
        let weddingRoomPrice = 0;
        let singleRoomPrice = 0;
        let preparationPrice = 0;
        let fireworksPrice = 0;
        for (let service of services) {
            if (service.name == "base-price") {
                basePrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "at-evening") {
                eveningPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "church") {
                churchPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "area") {
                singleAreaPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "wedding-room") {
                weddingRoomPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "room") {
                singleRoomPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            } else if (service.name == "preparation") {
                preparationPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            }  else if (service.name == "fireworks") {
                fireworksPrice = (parseInt(service.price) - (((parseInt(service.price)) * (parseInt(service.discount)))/100));
            }
        }
        sum = (basePrice
            + (profileIsInEvening ? eveningPrice : 0) 
            + (profileUseChurch ? churchPrice : 0)
            + ((profileAreas == "" ? 0 : parseInt(profileAreas)) * (singleAreaPrice))
            + ((profileRooms == "" ? 0 : parseInt(profileRooms)) * (profileRooms == "1" ? weddingRoomPrice : singleRoomPrice))
            + (profilePreparation ? preparationPrice : 0)
            + (profileFireworks ? fireworksPrice : 0));
        setEventPrice(sum);
    }


const addNewEvent = () => {
    let event = {
        id : eventId,
        title : eventTitle,
        date : eventDate,
        price : eventPrice,
        profile : {
            areas: profileAreas,
            catering: profileCatering,
            church : profileUseChurch,
            description : profileDescriprion,
            evening : profileIsInEvening,
            fireworks : profileFireworks,
            guests : profileGuests,
            preparartion : profilePreparation,
            rooms : profileRooms,
            planner : props.loggedUser,
            user : {
               id : customer
            }
        }
    }
    axios.post(`${props.LINK}/events`, event, {headers: {Authorization: "Bearer " + props.accessToken}})
    .then(res => {
        let returnedEvent = res.data;
        setReturnedEvent(returnedEvent);
    })
}

    useEffect(() => {
        if (props.loggedUser.userType == "wedding-planner" || props.loggedUser.userType == "event-planner") {
            if (selectorState == "1") {
                getNextEvent();
            } else if (selectorState == "2") {
                getAllEvent();
            }else if (selectorState == "3") {
                setEvents([]);
            } else if (selectorState == "4"){
                setEvents([]);
                getAllUsers();
                getPlanners(props.loggedUser.userType);
            }
        }
    }, [props.loggedUser, selectorState, returnedEvent])

    return (
        <div>
            <div className={showModifyEventForm ? "events-no-display" : ""}>
                <div className="planner-event-selector-container">
                    <div className="planner-event-selector">
                        <button className={selectorState == "1" ? "planner-event-selector-active" : "planner-event-selector-notactive"} onClick={(e) => {setSelectorState("1")}}>PROSSIMI EVENTI</button>
                        <button className={selectorState == "2" ? "planner-event-selector-active" : "planner-event-selector-notactive"} onClick={(e) => {setSelectorState("2")}}>TUTTI GLI EVENTI</button>
                        <button className={selectorState == "3" ? "planner-event-selector-active" : "planner-event-selector-notactive"} onClick={(e) => {setSelectorState("3")}}>CERCA</button>
                        <button className={selectorState == "4" ? "planner-event-selector-active" : "planner-event-selector-notactive"} onClick={(e) => {clear(); setSelectorState("4")}}>CREA EVENTO</button>
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
                            <button className="btn search-visit-button" onClick={(e) => {e.preventDefault(); getEventByDate()}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                        </form>
                    </div>
                    <div className={searchByDate == "range" ? "search-visit-by-date": "visit-dock-no-display"}>
                        <form>
                            <label className="search-visit-label">Prima data:</label>
                            <input value={firstDate}className="search-visit-input" type="datetime-local" onChange={(e) => {setFirstDate(e.target.value)}}></input>
                            <label className="search-visit-label">Seconda data:</label>
                            <input value={secondDate} className="search-visit-input" type="datetime-local" onChange={(e) => {setSecondDate(e.target.value)}}></input>
                            <button className="btn search-visit-button" onClick={(e) => {e.preventDefault(); getEventsByDateRange()}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                        </form>
                    </div>
                </div>
                <EventsList events={events} loggedUser={props.loggedUser} onResendEventId={setRecivedEventId}/>
            </div>
            <div className={showModifyEventForm ? "" : "events-no-display"}>
                <div className="modify-event-form-container">
                    <div className="close-modify-event-form-container">
                        <button className="close-modify-event-form" onClick={(e) => {e.preventDefault(); setShowModifyEventForm(false)}}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    </div>
                    <p className="modify-event-form-title">Modifica evento:</p>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <p>
                                    <label className="modify-event-form-label">Titolo:</label><br/>
                                    <input className="modify-event-form-input-50" defaultValue={eventTitle} type="text" onChange={(e) => {setEventTitle(e.target.value)}}></input>
                                </p>
                                <p>
                                    <label className="modify-event-form-label">Data:</label><br/>
                                    <input className="modify-event-form-input-50" defaultValue={eventDate} type="datetime-local" onChange={(e) => {setEventDate(e.target.value)}}></input>
                                </p>
                                <p>
                                    <label className="modify-event-form-label">Cliente:</label><br/>
                                    <span className="modify-event-form-span">{profileUser.name} {profileUser.surname}</span>
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <p>
                                        <label className="modify-event-form-label">{profilePlanner.userType == "wedding-planner" ? "Wedding Planner" : "Event Planner"}:</label><br/>
                                        <select className="modify-event-form-input" onChange={(e) => {setProfilePlanner(e.target.value)}}>
                                            <option value={profilePlanner}>{profilePlanner.name + " " + profilePlanner.surname}</option>
                                            {planners.map((planner, index) => {
                                                if (planner.name != profilePlanner.name && planner.surname != profilePlanner.surname) {
                                                    return (
                                                        <option key={index} value={planner}>{planner.name + " " + planner.surname}</option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </p>
                                    <div className="col-6">
                                        <p>
                                            <label className="modify-event-form-label">Partecipanti:</label>
                                            <input className="modify-event-form-input" defaultValue={profileGuests} type="number" onChange={(e) => {setProfileGuests(e.target.value)}}></input>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p>
                                            <label className="modify-event-form-label">Fascia oraria:</label>
                                                <select className="modify-event-form-input" onChange={(e) => {setIsInEvening(e.target.value)}}>
                                                    <option value={profileIsInEvening}>{profileIsInEvening ? "Serale" : "Diurno"}</option>
                                                    <option value={!profileIsInEvening}>{profileIsInEvening ? "Diurno" : "Serale"}</option>
                                                </select>
                                        </p>
                                    </div>
                                    <p>
                                        <label className="modify-event-form-label">Catering</label>
                                        <input className="modify-event-form-input" defaultValue={profileCatering} type="text" onChange={(e) => {setProfileCatering(e.target.value)}}></input>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-6">
                                        <p>
                                            <label className="modify-event-form-label">Costo:</label><br/>
                                            <input className="modify-event-form-input-price" value={eventPrice} type="numeric" onChange={(e) => {setEventPrice(e.target.value)}}></input><span className="euro-symbol"> €</span>
                                        </p>
                                        <p>
                                            <label className="modify-event-form-label">Camere:</label>
                                            <select className="modify-event-form-input" onChange={(e) => {setProfileRooms(e.target.value)}}>
                                                <option>{profileRooms}</option>
                                                {
                                                    [0, 1, 2, 3, 4, 5].map((room, index) => {
                                                        if (room != profileRooms) {
                                                            return (
                                                            <option key={index} value={room}>{room}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>
                                        </p>
                                        <p>
                                            <label className="modify-event-form-label">Utilizzo chiesa:</label>
                                            <select className="modify-event-form-input" onChange={(e) => {setProfileUseChurch(e.target.value)}}>
                                                <option value={profileUseChurch}>{profileUseChurch ? "Si" : "No"}</option>
                                                <option value={!profileUseChurch}>{profileUseChurch ? "No" : "Si"}</option>
                                            </select>
                                        </p>
                                    </div>
                                        <div className="col-6">
                                        <p>
                                            <label className="modify-event-form-label">Preparazione:</label>
                                            <select className="modify-event-form-input" onChange={(e) => {setProfileUseChurch(e.target.value)}}>
                                                <option value={profilePreparation}>{profilePreparation ? "In Villa" : "Non in Villa"}</option>
                                                <option value={!profilePreparation}>{profilePreparation ? "Non in Villa" : "In Villa"}</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label className="modify-event-form-label">Aree utilizzate:</label>
                                            <input className="modify-event-form-input" defaultValue={profileAreas} type="number" min={0} max={5} onChange={(e) => {setProfileAreas(e.target.value)}}></input>
                                        </p>
                                        <p>
                                            <label className="modify-event-form-label">Fuochi d'artificio: </label>
                                            <select className="modify-event-form-input" onChange={(e) => {setProfileFireworks(e.target.value)}}>
                                                <option value={profileFireworks}>{profileFireworks ? "Si" : "No"}</option>
                                                <option value={!profileFireworks}>{profileFireworks ? "No" : "Si"}</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>       
                            </div>
                        </div>
                        <p>
                            <label className="modify-event-form-label">Descrizione</label>
                            <textarea className="modify-event-description" defaultValue={profileDescriprion} maxLength="765" onChange={(e) => {setProfileDescriprion(e.target.value)}}></textarea>
                        </p>
                        <button className="modify-event-button" type="submit" onClick={(e) => {e.preventDefault(e); modifyEvent(); setShowModifyEventForm(false)}}>Salva modifiche</button>
                    </form>
                </div>
            </div>
            <div className={selectorState == "4" ? "" : "visit-dock-no-display"}>
                <div className="add-event-form-container">
                    <p className="create-event-title">Crea un evento:</p>
                    <form>
                    <div className="row">
                            <div className="col-12">
                                <p>
                                    <label className="create-event-form-label">Titolo:</label><br/>
                                    <input className="create-event-form-input-small" value={eventTitle} type="text" onChange={(e) => {setEventTitle(e.target.value)}}></input>
                                </p>
                                <p>
                                    <label className="create-event-form-label">Data:</label><br/>
                                    <input className="create-event-form-input-small" value={eventDate} type="datetime-local" onChange={(e) => {setEventDate(e.target.value)}}></input>
                                </p>
                                <p>
                                    <label className="create-event-form-label">Cliente:</label><br/>
                                    <select className="create-event-form-input-small" onChange={(e) => {setCustomer(e.target.value)}}>
                                        <option>-- scegli il cliente</option>
                                        {customersList.map((customer, index) => {
                                            return (
                                                <option key={index} value={customer.id}> {customer.surname} {customer.name} ({customer.email})</option>
                                            )
                                        })}
                                    </select>
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <p>
                                        <label className="create-event-form-label">{profilePlanner.userType == "wedding-planner" ? "Wedding Planner" : "Event Planner"}:</label><br/>
                                        <select className="create-event-form-input" onChange={(e) => {setProfilePlanner(e.target.value)}}>
                                            <option value={props.loggedUser}>{props.loggedUser.name + " " + props.loggedUser.surname}</option>
                                            {planners.map((planner, index) => {
                                                if (planner.name != props.loggedUser.name && planner.surname != props.loggedUser.surname) {
                                                    return (
                                                        <option key={index} value={planner}>{planner.name + " " + planner.surname}</option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </p>
                                    <div className="col-6">
                                        <p>
                                            <label className="create-event-form-label">Partecipanti:</label>
                                            <input className="create-event-form-input" value={profileGuests} type="number" onChange={(e) => {setProfileGuests(e.target.value)}}></input>
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p>
                                            <label className="create-event-form-label">Fascia oraria:</label>
                                                <select className="create-event-form-input" onChange={(e) => {setIsInEvening(e.target.value)}}>
                                                    <option value={true}>{"Serale"}</option>
                                                    <option value={false}>{"Diurno"}</option>
                                                </select>
                                        </p>
                                    </div>
                                    <p>
                                        <label className="create-event-form-label">Catering</label>
                                        <input className="create-event-form-input" value={profileCatering} type="text" onChange={(e) => {setProfileCatering(e.target.value)}}></input>
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="col-6">
                                        <p>
                                            <label className="create-event-form-label">Costo:</label><br/>
                                            <input className="create-event-form-input-xsmall" value={eventPrice} type="numeric" onChange={(e) => {setEventPrice(e.target.value)}}></input><span className="euro-symbol"> €</span>
                                            <button className="price-event-button" onClick={(e) => {e.preventDefault(); calculatePrice()}}>CALCOLA</button>
                                        </p>
                                        <p>
                                            <label className="create-event-form-label">Camere:</label>
                                            <select className="create-event-form-input" onChange={(e) => {setProfileRooms(e.target.value)}}>
                                                <option>{profileRooms}</option>
                                                {
                                                    [0, 1, 2, 3, 4, 5].map((room, index) => {
                                                        if (room != profileRooms) {
                                                            return (
                                                            <option key={index} value={room}>{room}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                            </select>
                                        </p>
                                        <p>
                                            <label className="create-event-form-label">Utilizzo chiesa:</label>
                                            <select className="create-event-form-input" onChange={(e) => {setProfileUseChurch(e.target.value)}}>
                                                <option value={true}>{"Si"}</option>
                                                <option value={false}>{"No"}</option>
                                            </select>
                                        </p>
                                    </div>
                                        <div className="col-6">
                                        <p>
                                            <label className="create-event-form-label">Preparazione:</label>
                                            <select className="create-event-form-input" onChange={(e) => {setProfileUseChurch(e.target.value)}}>
                                                <option value={true}>{"In Villa"}</option>
                                                <option value={false}>{"Non in Villa"}</option>
                                            </select>
                                        </p>
                                        <p>
                                            <label className="create-event-form-label">Aree utilizzate:</label>
                                            <input className="create-event-form-input" value={profileAreas} type="number" min={0} max={5} onChange={(e) => {setProfileAreas(e.target.value)}}></input>
                                        </p>
                                        <p>
                                            <label className="create-event-form-label">Fuochi d'artificio: </label>
                                            <select className="create-event-form-input" onChange={(e) => {setProfileFireworks(e.target.value)}}>
                                                <option value={true}>{"Si"}</option>
                                                <option value={false}>{"No"}</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>       
                            </div>
                        </div>
                        <p>
                            <label className="create-event-form-label">Descrizione</label>
                            <textarea className="add-event-description" value={profileDescriprion} maxLength="765" onChange={(e) => {setProfileDescriprion(e.target.value)}}></textarea>
                        </p>
                        <button className="create-event-button" type="submit" onClick={(e) => {e.preventDefault(e); addNewEvent(); clear(); setSelectorState("1")}}>Crea evento</button>
                    </form>
                </div>
            </div>
        </div>
    ) 
}

export default EventPlannerDock;