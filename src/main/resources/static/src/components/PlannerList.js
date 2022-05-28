import React, {useEffect, useState} from "react";
import "./PlannerList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhoneAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const PlannerList = (props) => {
    const [plannerList, setPlannerList] = useState([]);

    useEffect(() => {
        setPlannerList(props.plannerList);
    }, [props.plannerList])

    const sendDeletedUserId = (id) => {
        props.onSendDeletedUserId(id);
    }

    const plannerGroup = plannerList.map((planner, index) => {
        return (
            <div key={index} className="col-lg-4">
                <div className="planner-container" >
                    <div className="row">
                        <div className="col-9">
                            <div className="planner-data-wrapper">
                                <p className="planner-name">{planner.name} {planner.surname}</p>
                                <p className="planner-type">{planner.userType == "wedding-planner" ? "Wedding Planner" : "Event Planner"}</p>
                                <p><FontAwesomeIcon icon={faAt} /><span className="planner-email"> {planner.email}</span></p>
                                <p><FontAwesomeIcon icon={faPhoneAlt} /><span className="planner-phone-number"> {planner.phoneNumber}</span></p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="planner-trash-wrapper">
                                <button className="planner-delete-button" value={planner.id} onClick={(e) => {sendDeletedUserId(e.currentTarget.value)}}><FontAwesomeIcon icon={faTrash}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="row">
            {plannerGroup}
        </div>
    )
}

export default PlannerList;