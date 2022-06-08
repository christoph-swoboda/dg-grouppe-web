import React, {useState, useEffect} from "react";
import {FaHourglassHalf} from "react-icons/fa";
import '../../style/requestStatus.scss'

const RequestStatus = ({count, requestStatus, iconBg}) => {

    return (
        <div className='requestStatus'>
            <div className='flexStatus'>
                <div className='wrapIcon' style={{backgroundColor:iconBg}}>
                    <FaHourglassHalf size='22px' color='white'/>
                </div>
                {/*<div className='statusInfo'>*/}
                    <h1>{count}</h1>
                    <h2>{requestStatus} Requests</h2>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default RequestStatus
