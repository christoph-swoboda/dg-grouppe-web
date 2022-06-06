import React from "react";
import {GrFormNext} from "react-icons/gr";
import EmployeesInfo from "../../../helpers/employeesInfo";

const EmployeesList = () => {
    return (
        <div className='tableContainer'>
            <table>
                <tr>
                    <th>NAME</th>
                    <th>COMPANY</th>
                    <th>CAR</th>
                    <th>TRAIN</th>
                    <th>INTERNET</th>
                    <th>OPEN REQUESTS</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
                {
                    EmployeesInfo.map(item => (
                        <tr key={item.id}>
                            <td className='name'>{item.name}</td>
                            <td>{item.company}</td>
                            <td>{item.car}</td>
                            <td>{item.train}</td>
                            <td>{item.internet}</td>
                            <td>{item.requests}</td>
                            <td>{item.status}</td>
                            <td style={{cursor: 'pointer'}}>
                                <GrFormNext size='25px'/>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default EmployeesList
