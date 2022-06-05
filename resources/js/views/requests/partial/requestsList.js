import React, {useState} from "react";
import RequestsInfo from "../../../helpers/requestsInfo";
import {GrFormNext} from "react-icons/gr";
import {Link} from "react-router-dom";
import useModal from "../../../hooks/useModal";
import Modal from "../../../hooks/modal";
import ManageRequests from "./manageRequests";

const RequestsList = () => {

    const {toggle, visible} = useModal();
    const [request, setRequest] = useState({name: '', image: '', period: '', request: '', id: ''});

    function openModal(period, name, req, id, image) {
        toggle()
        setRequest({name: name, request: req, period: period, id: id, image: image})
    }

    return (
        <div className='tableContainer'>
            <Modal
                toggle={toggle}
                visible={visible}
                component={<ManageRequests requestInfo={request}/>}
                className='manageRequests'
            />
            <h1>Open</h1>
            <table>
                <tr>
                    <th>NAME</th>
                    <th>REQUEST</th>
                    <th>DEADLINE</th>
                    <th>PERIOD</th>
                    <th></th>
                </tr>
                {
                    RequestsInfo.map(item => (
                        <tr key={item.id}>
                            <td className='name'>{item.name}</td>
                            <td>{item.request}</td>
                            <td>{item.deadline}</td>
                            <td>{item.period}</td>
                            <td
                                onClick={() => openModal(item.period, item.name, item.request, item.id, item.name)}
                                style={{cursor: 'pointer'}}
                            >
                                <GrFormNext size='25px'/>
                            </td>
                        </tr>
                    ))
                }
            </table>
            <div className='listBottom'>
                <Link to={'/'}>See all</Link>
            </div>
        </div>
    )
}

export default RequestsList
