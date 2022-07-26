import React, {useEffect, useState} from "react";
import {useStateValue} from "../../../states/StateProvider";
import PropTypes from "prop-types";
import Api from "../../../api/api";
import {AiOutlineCloseSquare} from "react-icons/ai";

const ManageRequests = ({title, name, id, period, status, deadline, responseImage, type}) => {

    const [{approve, approvalModal}, dispatch] = useStateValue();
    const [message, setMessage] = useState('')
    const [reject, setReject] = useState(false)

    async function Approve() {
        if (confirm('Sure To Approve This Bill Request?')) {
            await Api().get(`/request/approve/${id}`)
                .then(res => {
                    dispatch({type: "Set_ApprovalModal", item: !approvalModal})
                    dispatch({type: "Set_Approved", item: !approve})
                })
        }
    }

    async function Reject() {
        setReject(true)
        let data = new FormData()
        data.append('message', message)

        if (message) {
            await Api().post(`/request/reject/${id}`, data)
                .then(res => {
                    dispatch({type: "Set_ApprovalModal", item: !approvalModal})
                    dispatch({type: "Set_Approved", item: !approve})
                })
        }
    }

    return (
        <div>
            <p style={{cursor: 'pointer', float: 'right'}}
               onClick={() => dispatch({type: "Set_ApprovalModal", item: false})}
            ><AiOutlineCloseSquare size='3vh'/>
            </p>
            <h1>{title} {type} Bill</h1>
            {
                responseImage ?
                    <img src={`/${responseImage}`} alt={responseImage}/>
                    :
                    <h1 style={{fontSize: '1.5vh'}}>User Has Not Uploaded An Image Yet</h1>
            }
            <br/>
            <h2>Id: <span>{id}</span></h2>
            <h2>Name: <span>{name}</span></h2>
            <h2>Status: <span>{status === '1' ? 'Pending' : status === '2' ? 'Approved' : 'Rejected'}</span></h2>
            <h2>Period: <span>{period}</span></h2>
            <h2>Deadline: <span>{deadline}</span></h2>

            <div className='rejectPopup'>
                <select className='selectOption' hidden={!reject} onChange={(e) => setMessage(e.target.value)}>
                    <option value={''}>Choose A Reason</option>
                    <option value={'Photo Is Not Clear'}>Photo Is Not Clear</option>
                    <option value={'Photo Is Not From Correct Period'}>Photo Is Not From Correct Period</option>
                </select>
            </div>

            <div className='approvalSection'>
                <button disabled={reject && !message} hidden={status === '3' || !responseImage}
                        className={reject && !message ? 'reject' : 'rejectEnabled'}
                        onClick={Reject}>Reject
                </button>

                <button className='approve' hidden={status === '2' || !responseImage} onClick={Approve}>
                    Approve
                </button>
            </div>
        </div>
    )
}

export default ManageRequests

ManageRequests.propTypes = {
    id: PropTypes.number,
    deadline: PropTypes.string,
    title: PropTypes.string,
    period: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    responseImage: PropTypes.string,
}
