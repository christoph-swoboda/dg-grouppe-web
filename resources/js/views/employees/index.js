import React, {useState, useEffect} from "react"
import '../../style/employees.scss'
import {BsSearch} from "react-icons/bs";
import EmployeesList from "./partial/employeesList";
import useModal from "../../hooks/useModal";
import Modal from "../../hooks/modal";
import ManageRequests from "../requests/partial/manageRequests";
import AddEmployee from "../../components/forms/addEmployee";
import {useStateValue} from "../../states/StateProvider";

const Employees = () => {

    const {toggleEmployeeForm} = useModal();
    const [{addEmployeeModal}] = useStateValue();

    return (
        <div className='employees'>
            <h1>Employees</h1>
            <br/>
            <div className='topSection'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='search' placeholder='Search Employees'/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
                <button className='addEmployee' onClick={toggleEmployeeForm}>
                    + Add New Employee
                </button>
            </div>
            <div className='employeesList'>
                <EmployeesList/>
            </div>

            {/*add employee modal*/}
            <Modal
                toggle={toggleEmployeeForm}
                visible={addEmployeeModal}
                component={<AddEmployee/>}
                className='addEmployeeContainer'
            />
            {/*add employee modal*/}
        </div>
    )
}

export default Employees
