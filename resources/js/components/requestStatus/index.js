import React, {useState, useEffect} from "react";
import {FaHourglassHalf} from "react-icons/fa";
import '../../style/requestStatus.scss'
import {BeatLoader} from "react-spinners";
import {useLocation} from "react-router-dom";

const RequestStatus = ({count, requestStatus, iconBg}) => {
    const location=useLocation()
    const path=location.pathname

    return (
            <div className='requestStatus'>
            <div className='flexStatus'>
                <div className='wrapIcon' style={{backgroundColor:iconBg}}>
                    <FaHourglassHalf size={path.includes('dashboard') ?'40px':'22px'} color='white'/>
                </div>
                <div className={!path.includes('dashboard') ?'status':'statusInfo'}>
                    <h1>{count || count===0? count : <BeatLoader size={10} color={'#000000'}/>}</h1>
                    <h2>{requestStatus} Requests</h2>
                </div>
            </div>
        </div>
    )
}

export default RequestStatus
