import React, {useEffect, useState} from "react";
import {GrFormNext} from "react-icons/gr";
import PropTypes from "prop-types";
import useModal from "../hooks/useModal";
import {useStateValue} from "../states/StateProvider";
import Modal from "./modal";
import ManageRequests from "../views/requests/partial/manageRequests";
import {getDeadline, getPeriod} from "../helpers/calculatePeriod&Deadline";

const EmployeesTable = ({status, id, company, period, created,created_at, year, title, name, type, responseImage}) => {

    const {toggleApprovalModal} = useModal();
    const [{approveData, approvalModal}, dispatch] = useStateValue();
    const [Period, setPeriod] = useState('')
    const [deadline, setDeadline] = useState('')

    function openModal(id, title, name, Period, deadline, status, image) {
        dispatch({
            type: "setApproveData",
            item: {
                id: id,
                title: title,
                type: type,
                name: name,
                deadline: deadline,
                period: Period,
                status: status,
                responseImage: image,
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
            <td>{id}</td>
            <td>{company}</td>
            <td>{type}</td>
            <td>{Period}</td>
            <td>{created}</td>
            <td>{deadline}</td>
            <td className={status === '1' ? 'listPending' : status === '2' ? 'listApproved' : 'listRejected'}>
                <li>{status === '1' ? 'Pending' : status === '2' ? 'Approved' : 'Rejected'}</li>
            </td>
            <td
                onClick={() => openModal(id, title, name, Period, deadline, status, responseImage)}
                style={{cursor: 'pointer'}}
            >
                <GrFormNext size='25px'/>
            </td>
        </tr>
        </tbody>
    )
}

export default EmployeesTable

EmployeesTable.propTypes = {
    status: PropTypes.string,
    id: PropTypes.number,
    company: PropTypes.string,
    type: PropTypes.string,
    year: PropTypes.number,
    created: PropTypes.string,
}
