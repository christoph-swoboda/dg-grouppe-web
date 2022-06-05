import React from "react";
import RequestsInfo from "../../../helpers/requestsInfo";
import {GrFormNext} from "react-icons/gr";
import {Link} from "react-router-dom";

const RequestsList = () => {
    return (
        <div className='tableContainer'>
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
                    RequestsInfo.map(item=>(
                        <tr key={item.id}>
                            <td className='name'>{item.name}</td>
                            <td>{item.request}</td>
                            <td>{item.deadline}</td>
                            <td>{item.period}</td>
                            <td> <GrFormNext size='25px'/> </td>
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
