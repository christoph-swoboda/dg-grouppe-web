import React, {useState, useEffect} from "react"
import '../../style/employees.scss'
import {BsSearch} from "react-icons/bs";
import EmployeesList from "./partial/employeesList";
import useModal from "../../hooks/useModal";
import Modal from "../../hooks/modal";
import ManageRequests from "../requests/partial/manageRequests";
import AddEmployee from "./partial/addEmployee";

const Employees = () => {

    const {toggle, visible} = useModal();

    return (
        <div className='employees'>
            <h1>Employees</h1>
            <br/>
            <div className='topSection'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='search' placeholder='Search Employees'/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
                <button className='addEmployee' onClick={toggle}>
                    + Add New Employee
                </button>
            </div>
            <div className='employeesList'>
                <EmployeesList/>
            </div>

            {/*add employee modal*/}
            <Modal
                toggle={toggle}
                visible={visible}
                component={<AddEmployee/>}
                className='addEmployeeContainer'
            />
            {/*add employee modal*/}
        </div>
    )
}

export default Employees
