import React, { useEffect, useState } from "react";
import "./Login.css";
import 'font-awesome/css/font-awesome.min.css';
import {Navigate, Link} from "react-router-dom";
import axios from "axios";

const Login = (props) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState("password");
    const [emailValidity, setEmailValidity] = useState("log-in-invalid-email-message-hidden");
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({});


    const manageShowPassword = () => {
        if (showPassword == "password") {
            setShowPassword("text");
        } else {
            setShowPassword("password");
        }
    }

    const EmailValidityTrue = () => {
        setEmailValidity("log-in-invalid-email-message-hidden");
    }

    const EmailValidityFalse = () => {
        setEmailValidity("log-in-invalid-email-message");
    }

    const emailValidation = (email) => {
        if (email.length >= 1 && !email.includes("@")) {
            clearTimeout(timeout);
            var timeout = setTimeout(EmailValidityFalse, 2000);
        } else {
            clearTimeout(timeout);
            var timeout = setTimeout(EmailValidityTrue, 200);
        }
    }

    const getUser = (e) => {
        e.preventDefault();
        let credential = {
            email: loginEmail,
            password: loginPassword
        }
        axios.post(`${props.LINK}/users/login`, credential)
        .then(res => {
            let recivedUser = res.data;
            setUser(recivedUser.user);
            setIsLogged(true);
            sendUser(recivedUser.user, recivedUser.accessToken);
        })
        .catch(error => {
            if (error.response.data == undefined) {
                alert("Email o password non validi, controlla e riprova");
            } else if (error.response.status = 401) {
                alert("Email o password non validi, controlla e riprova");
            } else {
                alert(error.response.data);
                setIsLogged(false);
            }
        })
    }

    const sendUser = (user, token) => {
        props.onSendLoggedUser(user, token);
    }

    const autoExitFromUser = () => {
        alert("Sessione scaduta, riesegui il login");
        setIsLogged(false);
        setUser({});
        sendUser("", "");
    }

    useEffect(() => {
        if(props.newAccountUserLogged.userType == "customer") {
            setUser(props.newAccountUserLogged);
            setIsLogged(true);
        }
    })

    useEffect(() => {
        if (isLogged) {
            var autoLogOut = setTimeout(autoExitFromUser,86400000);
        } else {
            clearTimeout(autoLogOut);
        }
    }, [isLogged])


    if (isLogged) {
        if (user.userType == "admin") {
            return (
                <Navigate to="/admin-dock"></Navigate>
            )
        } else if (user.userType == "wedding-planner" || user.userType == "event-planner"){
            return (
                <Navigate to="/planner-dock"></Navigate>
            )
        } else if (user.userType == "customer"){
            return (
                <Navigate to="/customer-dock"></Navigate>
            )
        }
    } else {
        return (
            <div>
                <p className="log-in-title">Accedi</p>
                <form className="log-in-form">
                    <p className="log-in-label">Inserisci le credenziali per accedre al tuo profilo</p>
                    <div className="row m-0">
                        <div id="log-in-email-section" className="col-12 p-0">
                            <label className="log-in-label">Email: </label><br/>
                            <input type="email" className="log-in-input log-in-input-email" onChange={(e) => {setLoginEmail(e.target.value); emailValidation(e.target.value)}}></input>
                            <p className={emailValidity}>Inserisci una email valida</p>
                        </div>
                        <div id="log-in-password-section" className="col-12 p-0">
                        <label className="log-in-label">Password:</label><br/>
                        <input type={showPassword} className="log-in-input" onChange={(e) => {setLoginPassword(e.target.value)}}></input>
                        <span className="log-in-show-password" type="checkbox" onClick={() => {manageShowPassword()}}><i className={showPassword == "password" ? "fa fa-eye": "fa fa-eye-slash"}></i></span>
                        </div>
                    </div>
                    <button type="submit" className="btn log-in-button" onClick={(e) => {getUser(e)}}>Accedi</button>
                </form>
                <div className="sing-in-div">
                    <p>Non possiedi un profilo?</p>
                    <Link className="btn log-in-button" to="/signin">Registrati</Link>
                </div>
            </div>
        )
    }
}

export default Login;