import React, {useState} from "react"
import '../../style/requests.scss'
import RequestStatus from "../../components/requestStatus";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsCalendar3} from "react-icons/bs";
import RequestsList from "./partial/requestsList";

const Requests = () => {
    const [filterDate, setFilterDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const currentYear = new Date().getFullYear();

    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setFilterDate(e);
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    return (
        <div className='requests'>
            <div className='statCards'>
                <RequestStatus count='500' iconBg='#698eea' requestStatus='Open'/>
                <RequestStatus count='480' iconBg='#eacc69' requestStatus='Pending'/>
                <RequestStatus count='350' iconBg='#ea6969' requestStatus='Rejected'/>
            </div>
            <div className='filters'>
                <div style={{position:'absolute'}}>
                    <h5>Select Year</h5>
                    <div className="yearInput" onClick={handleClick}>
                        <p> {filterDate.getFullYear()} </p>
                        <BsCalendar3 size='3vh'/>
                    </div>
                    {isOpen && (
                        <DatePicker
                            selected={filterDate}
                            showYearPicker
                            dateFormat="yyyy"
                            placeholderText='Select A Year'
                            onChange={handleChange}
                            inline
                        />
                    )}
                </div>

                <div className='periodFilter'>
                    <h5>Select Period</h5>
                    <select className='periodInput'>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>

            </div>

            <div className='requestsList'>
                <RequestsList/>
            </div>
            <div className='requestsList'>
                <RequestsList/>
            </div>
            <div className='requestsList'>
                <RequestsList/>
            </div>
            <div className='requestsList'>
                <RequestsList/>
            </div>
        </div>
    )
}

export default Requests
