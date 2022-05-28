import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

const Signin = (props) => {
    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    let navigate = useNavigate();

    const addNewUser = (e) => {
        e.preventDefault();
        if (userName == "" || userSurname == "" || userPhoneNumber == "" || userEmail == "" || userPassword == "") {
            alert("Tutti i campi devono essere compilati!");
            return;
        } else {
            let user = {
                name: userName,
                surname: userSurname,
                phoneNumber: userPhoneNumber,
                email: userEmail,
                password: userPassword,
                userType: "customer"
            }
            axios.post(`${props.LINK}/users/newUser`, user)
            .then(res => {
                getUser();
            })
            .catch(error => {
                alert(error.body);
            })
        }
    }

    const getUser = () => {
        let credential = {
            email: userEmail,
            password: userPassword
        }
        axios.post(`${props.LINK}/users/login`, credential)
        .then(res => {
            let recivedUser = res.data;
            props.onSendNewSigninUser(recivedUser.user, recivedUser.accessToken);
            navigate("/customer-dock");
            setUserName("");
            setUserSurname("");
            setUserPhoneNumber("");
            setUserEmail("");
            setUserPassword("");
        })
        .catch(error => {
            console.log(error);
            alert("Email o password non validi, controlla e riprova");
            navigate("/login");
        })
    }

    return (
        <div>
            <p className="signin-title">Registrati</p>
            <div className="signin-container">
                <div className="signin-form-cotainer">
                    <form className="signin-form">
                    <p className="signin-form-title">Compila i campi richiesti per registarti</p>
                        <div className="signin-content-container">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 signin-label">
                                        <label>Nome</label>
                                    </div>
                                    <div className="col-9 signin-input">
                                        <input type="text" value={userName} required onChange={(e) => {setUserName(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 signin-label">
                                        <label>Cognome</label>
                                    </div>
                                    <div className="col-9 signin-input">
                                        <input type="text" value={userSurname} required onChange={(e) => {setUserSurname(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 signin-label">
                                        <label>Telefono</label>
                                    </div>
                                        <div className="col-9 signin-input">
                                            <input type="text" value={userPhoneNumber} required onChange={(e) => {setUserPhoneNumber(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 signin-label">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-9 signin-input">
                                        <input type="text" value={userEmail} required onChange={(e) => {setUserEmail(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-3 signin-label">
                                        <label>Password</label>
                                    </div>
                                    <div className="col-9 signin-input">
                                        <input type="text" value={userPassword} required onChange={(e) => {setUserPassword(e.target.value)}}></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="signin-button-container">
                            <button type="submit" className="btn signin-button" onClick={(e) => {addNewUser(e)}}>CREA ACCOUNT</button>
                        </div>
                    </form>  
                </div>       
            </div>
        </div>
    )
}

export default Signin;