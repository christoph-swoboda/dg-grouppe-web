import React, {useEffect, useState} from "react";
import {GrFormNext} from "react-icons/gr";
import PropTypes from "prop-types";
import useModal from "../hooks/useModal";
import {useStateValue} from "../states/StateProvider";
import Modal from "./modal";
import ManageRequests from "../views/requests/partial/manageRequests";
import {getDeadline, getPeriod} from "../helpers/calculatePeriod&Deadline";
import {Link} from "react-router-dom";

const RequestsTable = ({id, title, period, status, year, name, responseImage, type, user, billId, published}) => {

    const {toggleApprovalModal} = useModal();
    const [Period, setPeriod] = useState('')
    const [deadline, setDeadline] = useState('')
    const [{approveData, approvalModal, approve}, dispatch] = useStateValue();

    function openModal(period, deadline) {
        dispatch({
            type: "setApproveData",
            item: {
                id: id,
                title: title,
                name: name,
                type: type,
                deadline: deadline,
                period: period,
                status: status,
                responseImage: responseImage,
            }
        })
        toggleApprovalModal()
    }

    useEffect(() => {
        setPeriod(getPeriod(period, year))
        setDeadline(getDeadline(period, year))
    }, []);


    return (
        <tbody>
        <Modal
            toggle={toggleApprovalModal}
            visible={approvalModal}
            component={<ManageRequests title={approveData.title} status={approveData.status}
                                       name={approveData.name} id={approveData.id} type={approveData.type}
                                       responseImage={approveData.responseImage}
                                       period={approveData.period} deadline={approveData.deadline}/>}
            className='manageRequests'
        />
        <tr>
            <td>{billId}</td>
            <td className='name'><Link to={`/employees/${user}`}>{name}</Link></td>
            <td>{title} {type} Bill</td>
            <td>{Period}</td>
            <td>{deadline}</td>
            <td hidden={published===1} style={{color:published===0? 'darkred':''}}>{status==='3'?'Recheck':'Awaiting'}</td>
            <td hidden={published===0}>{status === '1' ? 'Pending': status === '2' ? 'Approved' : 'Rejected'}</td>
            <td onClick={() => openModal(Period, deadline)}
                style={{cursor: 'pointer'}}
            >
                <GrFormNext size='25px'/>
            </td>
        </tr>
        </tbody>
    )
}

export default RequestsTable

RequestsTable.propTypes = {
    id: PropTypes.number,
    billId: PropTypes.number,
    year: PropTypes.number,
    title: PropTypes.string,
    period: PropTypes.number,
    name: PropTypes.string,
    status: PropTypes.string,
    employee: PropTypes.number,
    responseImage: PropTypes.string,
}
