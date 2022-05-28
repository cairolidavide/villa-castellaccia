import React, {useEffect, useState} from "react";
import "./UserList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

const UserList = (props) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        setUserList(props.userList);
    }, [props.userList])

    const userGroup = userList.map((user, index) => {
        return (
            <div key={index} className="col-lg-4">
                <div className="user-container" >
                    <div className="row">
                    <div className="col-2">

                    </div>
                        <div className="col-10">
                            <div className="user-data-wrapper">
                                <p className="user-name">{user.name} {user.surname}</p>
                                <p><FontAwesomeIcon icon={faAt} /><span className="user-email"> {user.email}</span></p>
                                <p><FontAwesomeIcon icon={faPhoneAlt} /><span className="user-phone-number"> {user.phoneNumber}</span></p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="row">
            {userGroup}
        </div>
    )
}

export default UserList;