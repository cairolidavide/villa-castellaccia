import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./Settings.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

const Settings = (props) => {

    const [showPersonalDataSettings, setShowPersonalDataSettings] = useState("settings-personal-data");
    const [showPaswordSettings, setShowPasswordSettings] = useState("settigns-no-display");
    const [showPersonalDataInput, setShowPersonalDataInput] = useState("settigns-no-display")
    const [showPasswordInput, setShowPasswordInput] = useState("settigns-no-display")
    const [showPassword, setShowPassword] = useState("password");
    const [personalDataButton, setPersonalDataButton] = useState("settings-list-link-active");
    const [paswordButton, setPasswordButton] = useState("settings-list-link");
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [validatePassword, setValidatePasword] = useState("settings-hidden");
    const [user, setUser] = useState({});
    const [controlPassword, setControlPassword] = useState("");
    const navigate = useNavigate();

    const redirect = () => {
        if (user.userType == "admin") {
            navigate("/admin-dock");
        } else if (user.userType == "wedding-planner" || user.userType == "event-planner") {
            navigate("/planner-dock");
        } else if (user.userType == "customer") {
            navigate("/customer-dock");
        }
    }

    const manageShowPassword = () => {
        if (showPassword == "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    }

    const passwordComparation = (psw1, psw2) => {
        if (psw1 == psw2) {
            setValidatePasword("settings-hidden");
        } else {
            if (psw2.length > 0) {
                setValidatePasword("no-match-password-message");
            }
        }
    }

    const modifyUser = () => {
        let modifiedUser = {
            id: user.id,
            name : userName == "" ? user.name : userName,
            surname : userSurname == "" ? user.surname : userSurname,
            phoneNumber : userPhoneNumber == "" ? user.phoneNumber : userPhoneNumber,
            email : userEmail == "" ? user.email : userEmail,
            password : newUserPassword == "" ? user.password : newUserPassword,
            userType : user.userType
        }
        axios.put(`${props.LINK}/users`, modifiedUser, {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            let returneUser = res.data;
            setUser(returneUser);
            setUserName("");
            setUserSurname("");
            setUserPhoneNumber("");
            setUserEmail("");
            setNewUserPassword("");
            setControlPassword("");
            props.onSendModifiedUser(returneUser, null);
        })
        .catch(error => {
            if (error.body == undefined) {
                setUserName("");
                setUserSurname("");
                setUserPhoneNumber("");
                setUserEmail("");
                setNewUserPassword("");
                setControlPassword("");
                alert("Qualcosa è andato storto, riprova più tardi");
            } else {
                setUserName("");
                setUserSurname("");
                setUserPhoneNumber("");
                setUserEmail("");
                setNewUserPassword("");
                setControlPassword("");
                alert(error.body);
            }
        })
    }

    useEffect(() => {
        setUser(props.loggedUser);
    }, [props.loggedUser])

    return (
        <div className="settings-background">
            <div className="settings-container">
                <div className="settings-header">
                    <div className="settings-close">
                        <button className="settings-close-link" onClick={redirect}><FontAwesomeIcon icon={faCircleXmark} /></button>
                    </div>
                </div>
                <div className="row">
                    <div id="settings-list" className="col-4">
                        <p className="settings-title">Impostazioni</p>
                        <div className="settings-link-container">
                            <button className={personalDataButton} onClick={() => {setPasswordButton("settings-list-link"); setPersonalDataButton("settings-list-link-active");setShowPasswordSettings("settigns-no-display"); setShowPersonalDataSettings("settings-personal-data")}}>Dati personali</button><br/>
                            <button className={paswordButton} onClick={() => {setPersonalDataButton("settings-list-link"); setPasswordButton("settings-list-link-active"); setShowPersonalDataSettings("settigns-no-display"); setShowPasswordSettings("settings-change-password")}}>Password</button>
                        </div>     
                    </div>
                    <div id="settings-data-list" className="col-8">
                        <div className={showPersonalDataSettings}>
                            <p className="setting-data-list-title">Dati personali:</p>
                            <div className="settings-data-container">
                                <div id="personal-data-container">
                                    <div className={showPersonalDataInput == "settigns-no-display"? "settings-margin" : ""}>
                                        <label className="settings-label">Nome:</label><br/>
                                        <span className={showPersonalDataInput == "settigns-no-display" ? "settings-data" : "settigns-no-display"}>{user.name}</span>
                                        <input className={showPersonalDataInput} type="text" defaultValue={user.name} onChange={(e) => {setUserName(e.target.value)}}></input>
                                    </div>
                                    <div className={showPersonalDataInput == "settigns-no-display"? "settings-margin" : ""}>
                                        <label className="settings-label">Cognome:</label><br/>
                                        <span className={showPersonalDataInput == "settigns-no-display" ? "settings-data" : "settigns-no-display"}>{user.surname}</span>
                                        <input className={showPersonalDataInput} type="text" defaultValue={user.surname} onChange={(e) => {setUserSurname(e.target.value)}}></input>
                                    </div>
                                    <div className={showPersonalDataInput == "settigns-no-display"? "settings-margin" : ""}>
                                        <label className="settings-label">Telefono:</label><br/>
                                        <span className={showPersonalDataInput == "settigns-no-display" ? "settings-data" : "settigns-no-display"}>{user.phoneNumber}</span>
                                        <input className={showPersonalDataInput} type="text" defaultValue={user.phoneNumber} onChange={(e) => {setUserPhoneNumber(e.target.value)}}></input>
                                    </div>
                                    <div className={showPersonalDataInput == "settigns-no-display"? "settings-margin" : ""}>
                                        <label className="settings-label">Email:</label><br/>
                                        <span className={showPersonalDataInput == "settigns-no-display" ? "settings-data" : "settigns-no-display"}>{user.email}</span>
                                        <input className={showPersonalDataInput} type="text" defaultValue={user.email} onChange={(e) => {setUserEmail(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="settings-button-container">
                                <button className={showPersonalDataInput == "settigns-no-display" ? "settings-button" : "settigns-no-display"} onClick={() => {setShowPersonalDataInput("settings-input")}}>Modifica</button>
                                <button className={showPersonalDataInput == "settigns-no-display" ? "settigns-no-display" :  "settings-button"} onClick={() => {setUserName(user.name); setUserSurname(user.surname); setUserPhoneNumber(user.phoneNumber); setUserEmail(user.email); setShowPersonalDataInput("settigns-no-display")}}>Annulla</button>
                                <button className={showPersonalDataInput == "settigns-no-display" ? "settigns-no-display" : "settings-button"} onClick={(e) => {e.preventDefault(); setShowPersonalDataInput("settigns-no-display"); modifyUser()}}>Salva modifiche</button>
                            </div>
                        </div>
                        <div className={showPaswordSettings}>
                        <p className="setting-data-list-title">Password:</p>
                            <div className="settings-data-container">
                                <p className={showPasswordInput == "settigns-no-display" ? "settings-psw-img-container" : "settigns-no-display" }>
                                    <span>****</span>
                                </p>
                                <p className={showPasswordInput == "settigns-no-display" ? "settigns-no-display" : "" }>
                                    <label className="settings-label">Nuova password:</label><br/>
                                    <input className={showPasswordInput} type={showPassword} value={newUserPassword} onChange={(e) => {setNewUserPassword(e.target.value)}}></input>
                                </p>
                                <p className={showPasswordInput == "settigns-no-display" ? "settigns-no-display" : "" }>
                                    <label className="settings-label">Ripeti nuova password:</label><br/>
                                    <input className={showPasswordInput} type={showPassword} value={controlPassword} onChange={(e) => {setControlPassword(e.target.value); passwordComparation(newUserPassword, e.target.value)}}></input><br/>
                                    <span className={validatePassword}>Le password non corrispondono</span>
                                    <br/>
                                    <span className="log-in-show-password" type="checkbox" onClick={() => {manageShowPassword()}}><i className={showPassword == "password" ? "fa fa-eye": "fa fa-eye-slash"}></i></span>
                                </p>
                            </div>
                            <div className="settings-button-container">
                                <button className={showPasswordInput == "settigns-no-display" ? "settings-button" : "settigns-no-display"} onClick={() => {setShowPasswordInput("settings-input")}}>Cambia password</button>
                                <button className={showPasswordInput == "settigns-no-display" ? "settigns-no-display" :  "settings-button"} onClick={() => {setShowPasswordInput("settigns-no-display"); setControlPassword(""); setNewUserPassword("")}}>Annulla</button>
                                <button className={showPasswordInput == "settigns-no-display" ? "settigns-no-display" : (validatePassword == "no-match-password-message" ? "save-password-disable-button" : "settings-button")} onClick={(e) => {e.preventDefault(); setShowPasswordInput("settigns-no-display"); modifyUser()}}>Salva modifiche</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;