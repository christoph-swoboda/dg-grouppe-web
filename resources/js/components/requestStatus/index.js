import React, {useState, useEffect} from "react";
import {FaHourglassHalf} from "react-icons/fa";
import '../../style/requestStatus.scss'
import {BeatLoader} from "react-spinners";

const RequestStatus = ({count, requestStatus, iconBg}) => {

    return (
        <div className='requestStatus'>
            <div className='flexStatus'>
                <div className='wrapIcon' style={{backgroundColor:iconBg}}>
                    <FaHourglassHalf size='22px' color='white'/>
                </div>
                {/*<div className='statusInfo'>*/}
                    <h1>{count || count===0? count : <BeatLoader size={8} color={'#73856f'}/>}</h1>
                    <h2>{requestStatus} Requests</h2>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default RequestStatus
