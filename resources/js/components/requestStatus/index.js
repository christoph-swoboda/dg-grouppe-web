import React, {useEffect, useState} from "react";
import '../../style/requestStatus.scss'
import {BeatLoader} from "react-spinners";
import {useLocation} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
import {MdOutlineDone} from "react-icons/md";
import {IoIosHourglass} from "react-icons/io";

const RequestStatus = ({count, requestStatus, iconBg}) => {
    const location = useLocation()
    const path = location.pathname
    const [size, setSize] = useState('')

    useEffect(() => {
        setSize(path.includes('dashboard') ? '40px' : '22px')
    }, []);


    return (
        <div className='requestStatus'>
            <div className='flexStatus'>
                <div className='wrapIcon' style={{backgroundColor: iconBg}}>
                    {
                        requestStatus === 'Anhängig' ?
                            <IoIosHourglass size={size} color='white'/>
                            : requestStatus === 'Abgelehnt' ?
                                <AiOutlineClose size={size} color='white'/>
                                :
                                <MdOutlineDone size={size} color='white'/>
                    }
                </div>
                <div className={!path.includes('dashboard') ? 'status' : 'statusInfo'}>
                    <h1>{count || count === 0 ? count : <BeatLoader size={10} color={'#000000'}/>}</h1>
                    <h2>{requestStatus} Anfragen</h2>
                </div>
            </div>
        </div>
    )
}

export default RequestStatus
