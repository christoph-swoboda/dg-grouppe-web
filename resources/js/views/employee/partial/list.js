import React, {useState, useEffect} from "react";
import RequestsInfo from "../../../helpers/requestsInfo";
import {GrFormNext} from "react-icons/gr";

const List = () => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>COMPANY</th>
                <th>REQUEST TYPE</th>
                <th>PERIOD</th>
                <th>ISSUED</th>
                <th>DEADLINE</th>
                <th>STATUS</th>
                <th></th>
            </tr>
            {
                RequestsInfo.map(item => (
                    <tr key={item.id}>
                        <td className='name'>{item.id}</td>
                        <td className='name'>{item.name}</td>
                        <td>{item.request}</td>
                        <td>{item.request}</td>
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
    )
}

export default List
