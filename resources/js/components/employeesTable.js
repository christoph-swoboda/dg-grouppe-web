import React from "react";
import {GrFormNext} from "react-icons/gr";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "./modal";
import SendRequest from "../components/sendRequest";
import {useStateValue} from "../states/StateProvider";
import useModal from "../hooks/useModal";

const EmployeesTable = ({name, id, bills, enabled, types}) => {

    const [{reqData, sendReqModal}, dispatch] = useStateValue();
    const {toggleSendReqModal} = useModal();

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
                                    title={'Anfrage Senden'}
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
            <td>{types?.filter(t => t.title === 'wagen').length > 0 ? 'ja' : ' keine'}</td>
            <td>{types?.filter(t => t.title === 'zug').length > 0 ? 'ja' : ' keine'}</td>
            <td>{types?.filter(t => t.title === 'internet').length > 0 ? 'ja' : ' keine'}</td>
            <td>{types?.filter(t => t.title === 'telefon').length > 0 ? 'ja' : ' keine'}</td>
            <td>{bills?.reduce((amount, item) => item.requests?.length + amount, 0)}</td>
            <td style={{color: enabled === 0 ? 'red' : 'green'}}>{enabled === 0 ? 'InAktiv' : 'Aktiv'}</td>
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
