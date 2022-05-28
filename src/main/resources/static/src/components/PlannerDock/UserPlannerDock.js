import React, { useEffect, useState } from "react";
import UserList from "../UserList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserPlannerDock.css";
import axios from "axios";

const UserPlannerDock = (props) => {
    const [userList, setUserList] = useState([]);

    const getAllUser = () => {
        axios.get(`${props.LINK}/users?userType=customer`,  {headers: {Authorization: "Bearer " + props.accessToken}})
        .then(res => {
            setUserList(res.data);
        })
    }

    useEffect(() => {
        if (props.loggedUser.userType == "wedding-planner" || props.loggedUser.userType == "event-planner") {
            getAllUser();
        }
    })

    return (
        <div>
            <p className="user-planner-title">TUTTI I CLIENTI:</p>
            <div className="row">
                <UserList userList={userList}/>
            </div>
        </div>
    )
}

export default UserPlannerDock;