import React from "react";
import image from '../../../assets/1.jpg'
import {useStateValue} from "../../../states/StateProvider";

const ManageRequests = ({requestInfo}) => {

    const [{}, dispatch] = useStateValue();

    return (
        <div>
            <h2>{requestInfo.request}</h2>
            <br/>
            <br/>
            <img src={image} alt={requestInfo.id}/>
            <br/>
            <h2>Name: {requestInfo.name}</h2>
            <h2>Period: {requestInfo.period}</h2>

            <div className='approvalSection'>
                <button className='reject' onClick={()=>{
                    dispatch(
                        {
                            type: "Set_ApprovalModal",
                            item: false,
                        })
                }}>Reject</button>
                <button className='approve'>Approve</button>
            </div>
        </div>
    )
}

export default ManageRequests
