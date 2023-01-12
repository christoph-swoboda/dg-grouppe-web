import React, {useState} from "react"
import '../../style/employee.scss'
import Intro from "./partial/intro";
import RequestStatus from "../../components/requestStatus";
import {BsCalendar3, BsSearch} from "react-icons/bs";
import DatePicker from "react-datepicker";
import {SiMicrosoftexcel} from "react-icons/si";
import List from "./partial/list";
import Modal from "../../hooks/modal";
import AddEmployee from "../../components/forms/addEmployee";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import "react-datepicker/dist/react-datepicker.css";

const Employee = () => {

    const [filterDate, setFilterDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false)
    const {toggleEmployeeForm} = useModal();
    const [{addEmployeeModal}] = useStateValue();

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setFilterDate(e);
    }

    return (
        <div className='employeeContainer'>
            <Intro/>
            <hr/>
            {/*statistics*/}
            <div className='statCards'>
                <RequestStatus count='500' iconBg={'rgba(33, 146, 228,1)'} requestStatus='Open'/>
                <RequestStatus count='480' iconBg={'rgba(228, 186, 33, 1)'} requestStatus='Pending'/>
                <RequestStatus count='350' iconBg={'rgba(228, 33, 104, 1)'} requestStatus='Rejected'/>
                <RequestStatus count='450' iconBg={'rgba(114, 200, 47, 1)'} requestStatus='Confirmed'/>
            </div>
            {/*statistics*/}
            <hr/>
            <h1>Requests</h1>

            {/* Filter */}
            <div className='filtersContainer'>
                <div className="yearInputEmployee" style={{position: 'relative', zIndex: '1'}} onClick={handleClick}>
                    <DatePicker
                        selected={filterDate}
                        showYearPicker
                        dateFormat="yyyy"
                        placeholderText='Select A Year'
                        onChange={handleChange}
                        id='date'
                    />
                    <label htmlFor="date"> <BsCalendar3 size='3vh' color='grey'/></label>
                </div>
                <select>
                    <option value="">Type: All</option>
                    <option value="phone">Phone</option>
                    <option value="internet">Internet</option>
                    <option value="car">Car</option>
                    <option value="train">Train</option>
                </select>
                <select>
                    <option value="">Period: All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input className='search' type='search' placeholder='Search...'/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
            </div>
            {/* Filter */}

            {/*print pdf*/}
            <div className='generatePDF'>
                <SiMicrosoftexcel color={'rgba(46, 125, 50, 1)'} size='25px'/>
                <p>Generate Report PDF</p>
            </div>
            {/*print pdf*/}

            {/*list of employees data*/}
            <div className='tableContainer'>
                <List/>
            </div>
            {/*list of employees data*/}


            {/*add employee modal*/}
            <Modal
                toggle={toggleEmployeeForm}
                visible={addEmployeeModal}
                component={<AddEmployee edit/>}
                className='addEmployeeContainer'
            />
            {/*add employee modal*/}
        </div>
    )
}

export default Employee
