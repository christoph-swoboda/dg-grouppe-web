import React, {useState, useEffect} from "react"
import '../../style/employees.scss'
import {BsSearch} from "react-icons/bs";
import EmployeesList from "./partial/employeesList";

const Employees = () => {
    return (
        <div className='employees'>
            <h1>Employees</h1>
            <br/>
            <div className='topSection'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='search' placeholder='Search Employees'/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
                <button className='addEmployee'>
                    + Add New Employee
                </button>
            </div>
            <div className='employeesList'>
                <EmployeesList/>
            </div>
        </div>
    )
}

export default Employees
