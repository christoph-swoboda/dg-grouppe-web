import React, {useEffect, useState} from "react";
import {useStateValue} from "../../../states/StateProvider";
import PropTypes from "prop-types";
import Api from "../../../api/api";
import {AiOutlineCloseSquare} from "react-icons/ai";
import {toast} from "react-toastify";

const ManageRequests = ({title, name, id, period, status, deadline, responseImage, type}) => {

    const [{approve, approvalModal}, dispatch] = useStateValue();
    const [message, setMessage] = useState('')
    const [reject, setReject] = useState(false)
    const [loading, setLoading] = useState(false)

    async function Approve() {
        if (confirm('Sure To Approve This Bill Request?')) {
            setLoading(true)
            await Api().get(`/request/approve/${id}`)
                .then(res => {
                    setLoading(false)
                    dispatch({type: "Set_ApprovalModal", item: !approvalModal})
                    dispatch({type: "Set_Approved", item: !approve})
                }).catch(e => {
                    toast.error('Something went wrong...')
                })
        }
    }

    async function Reject() {
        setReject(true)
        let data = new FormData()
        data.append('message', message)

        if (message) {
            setLoading(true)
            await Api().post(`/request/reject/${id}`, data)
                .then(res => {
                    setLoading(false)
                    dispatch({type: "Set_ApprovalModal", item: !approvalModal})
                    dispatch({type: "Set_Approved", item: !approve})
                }).catch(e => {
                    toast.error('Something went wrong...')
                })
        }
    }

    return (
        <div>
            <p style={{cursor: 'pointer', float: 'right'}}
               onClick={() => dispatch({type: "Set_ApprovalModal", item: false})}
            ><AiOutlineCloseSquare size='3vh'/>
            </p>
            <h1 style={{textTransform:'capitalize'}}>{title} {type} bill</h1>
            {
                responseImage !== 'No Image' ?
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
                    <option value={'Photo is not clear'}>Photo Is Not Clear</option>
                    <option value={'Photo is not from correct period'}>Photo Is Not From Correct Period</option>
                </select>
            </div>

            <div className='approvalSection'>
                <button disabled={reject && !message} hidden={status === '3' || responseImage === 'No Image'}
                        className={reject && !message ? 'reject' : 'rejectEnabled'}
                        onClick={Reject}>
                    {loading?'Rejecting...':'Reject'}
                </button>

                <button className='approve' hidden={status === '2' || reject || responseImage === 'No Image'}
                        onClick={Approve}>
                    {loading?'Approving...':'Approve'}
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
