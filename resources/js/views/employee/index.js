import React, {useEffect, useRef, useState} from "react"
import '../../style/employee.scss'
import Intro from "./partial/intro"
import {BsSearch} from "react-icons/bs"
import DatePicker from "react-datepicker"
import {SiMicrosoftexcel} from "react-icons/si"
import List from "./partial/list"
import Modal from "../../components/modal"
import AddEmployee from "../../components/forms/addEmployee"
import useModal from "../../hooks/useModal"
import {useStateValue} from "../../states/StateProvider"
import "react-datepicker/dist/react-datepicker.css"
import '../../style/datePicker.scss'
import Api from '../../api/api'
import qs from "qs";
import {useParams} from "react-router"
import StatsCard from "../../components/statsCard"
import {useReactToPrint} from "react-to-print"

const Employee = () => {

    const [filterDate, setFilterDate] = useState(new Date());
    const [printing, setPrinting] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [{addEmployeeDone, addEmployeeModal, approve}] = useStateValue();
    const [categories, setCategories] = useState([])
    const {toggleEmployeeForm} = useModal();
    const [user, setUser] = useState([])
    const [open, setOpen] = useState([])
    const [approved, setApproved] = useState([])
    const [rejected, setRejected] = useState([])
    const [userTypes, setUserTypes] = useState([])
    const [filter, setFilter] = useState({search: null, year: null, period: null, category: null})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})
    let params = useParams()
    const componentRef = useRef();

    useEffect(async () => {
        await Api().get(`/categories`).then(res => {
            setCategories(res.data)
        })
    }, []);

    useEffect(() => {
        setLoading(true)
        const delayQuery = setTimeout(async () => {
            await Api().get(`/employees/${params.id}?${query}`).then(res => {
                setUser(res.data?.user)
                setRejected(res.data?.rejected)
                setOpen(res.data.open)
                setApproved(res.data.approved)
                setUserTypes(res.data.user?.employees?.types)
                setLoading(false)
            })
        }, (query) ? 500 : 0)
        return () => clearTimeout(delayQuery)

    }, [addEmployeeDone, query, approve]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setFilterDate(e);
        setFilter({...filter, year: new Date(e).getFullYear()})
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    async function setPrintState() {
        setPrinting(true)
        setTimeout(() => handlePrint(), 1);
        setTimeout(() => setPrinting(false), 1);
    }

    return (
        <div className='employeeContainer' ref={componentRef}>
            <Intro user={user} printing={printing}/>
            <hr/>
            {/*statistics*/}
            <StatsCard openReq={open} approvedReq={approved} rejectedReq={rejected} user/>
            {/*statistics*/}
            <hr/>
            <h1 hidden={printing}>Requests</h1>
            {/* Filter */}
            <div style={{display: printing ? 'none' : 'grid'}} className='filtersContainer'>
                <div className="yearInputEmployee" onClick={handleClick}>
                    <DatePicker selected={filterDate}
                                showYearPicker
                                className={'thi'}
                                dateFormat="yyyy"
                                placeholderText='Select A Year'
                                onChange={handleChange}
                                id='date'
                    />
                    {/*<label htmlFor="date"> <BsCalendar3 size='3vh' color='grey'/></label>*/}
                </div>
                <select onChange={(e) => setFilter({
                    ...filter,
                    category: e.target.value !== '' ? e.target.value : null,
                })}>
                    <option value={''}>Type: All</option>
                    {
                        userTypes?.map(type => (
                            <option key={type.id} value={type.id}>{type.title}</option>
                        ))
                    }
                </select>
                <select onChange={(e) => setFilter({
                    ...filter,
                    period: e.target.value !== '' ? e.target.value : null
                })}>
                    <option value={''}>Period: All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input className='search' type='search' onChange={(e) => setFilter({
                        ...filter,
                        search: e.target.value,
                    })} placeholder='Search By Request Title...'/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
            </div>
            {/* Filter */}

            {/*print pdf*/}
            <div style={{display: printing ? 'none' : ''}} className='generatePDF' onClick={setPrintState}>
                <SiMicrosoftexcel color={'rgba(46, 125, 50, 1)'} size='25px'/>
                <p>Generate Report PDF</p>
            </div>
            {/*print pdf*/}

            {/*list of employees data*/}
            <div className='tableContainer'>
                <List bills={user?.bills}
                      user={user}
                      loading={loading}
                />
            </div>
            {/*list of employees data*/}

            {/*edit employee modal*/}
            <Modal toggle={toggleEmployeeForm}
                   visible={addEmployeeModal}
                   component={<AddEmployee user={user} categories={categories} edit/>}
                   className='addEmployeeContainer'
            />
            {/*edit employee modal*/}
        </div>
    )
}

export default Employee
