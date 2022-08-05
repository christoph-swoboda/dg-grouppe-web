import React, {useEffect, useState} from "react";
import {GrFormNext} from "react-icons/gr";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "./modal";
import SendRequest from "../components/sendRequest";
import {useStateValue} from "../states/StateProvider";
import useModal from "../hooks/useModal";

const EmployeesTable = ({name, id, bills, updated, types}) => {

    const [lastActive, setLastActive] = useState(0)
    const [{reqData, sendReqModal}, dispatch] = useStateValue();
    const {toggleSendReqModal} = useModal();

    useEffect(() => {
        let date = new Date(updated)
        let now = new Date()
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setLastActive(diffDays)
    }, []);

    function openModal() {
        dispatch({
            type: "setReqData",
            item: {
                user: id,
                types: types,
                name: name,
            }
        })
        toggleSendReqModal()
    }

    return (
        <tbody>
        <Modal
            toggle={toggleSendReqModal}
            visible={sendReqModal}
            component={<SendRequest types={reqData.types}
                                    title={'Send Request'}
                                    user={reqData.user}
                                    name={reqData.name}
            />}
            className='manageRequests'
        />
        <tr>
            <td className='name'>
                <Link to={`${id}`}>
                    <p style={{fontSize: '2vh'}}> {name}</p>
                </Link>
            </td>
            <td>DG-Gruppe</td>
            <td>{types?.filter(t => t.title === 'car').length > 0 ? 'Yes' : ' No'}</td>
            <td>{types?.filter(t => t.title === 'train').length > 0 ? 'Yes' : ' No'}</td>
            <td>{types?.filter(t => t.title === 'internet').length > 0 ? 'Yes' : ' No'}</td>
            <td>{types?.filter(t => t.title === 'phone').length > 0 ? 'Yes' : ' No'}</td>
            <td>{bills?.reduce((amount, item) => item.requests?.length + amount, 0)}</td>
            <td style={{color: lastActive > 30 ? 'red' : 'green'}}>{lastActive > 30 ? 'InActive' : 'Active'}</td>
            <td onClick={() => openModal()}
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
    name: PropTypes.string,
    id: PropTypes.number,
    bills: PropTypes.array,
    types: PropTypes.array,
    updated: PropTypes.string,
}
