import React from "react";
import image from '../../../assets/1.jpg'

const ManageRequests = ({requestInfo}) => {
    return (
        <div className='manageRequests'>
            <h2>{requestInfo.request}</h2>
            <br/>
            <br/>
            <img src={image} alt={requestInfo.id}/>
            <br/>
            <h2>Name: {requestInfo.name}</h2>
            <h2>Period: {requestInfo.period}</h2>

            <div className='approvalSection'>
                <button className='reject'>Reject</button>
                <button className='approve'>Approve</button>
            </div>
        </div>
    )
}

export default ManageRequests
