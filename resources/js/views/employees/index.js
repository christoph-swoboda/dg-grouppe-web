import React, {useEffect, useState} from "react"
import '../../style/employees.scss'
import {BsSearch} from "react-icons/bs";
import EmployeesList from "./partial/employeesList";
import useModal from "../../hooks/useModal";
import Modal from "../../components/modal";
import AddEmployee from "../../components/forms/addEmployee";
import {useStateValue} from "../../states/StateProvider";
import Api from "../../api/api";
import qs from "qs"
import {Link} from "react-router-dom";
import {BeatLoader} from "react-spinners";

const Employees = () => {

    const {toggleEmployeeForm} = useModal();
    const [{addEmployeeDone, sendReqDone, addEmployeeModal, pageNumber,resolved}] = useStateValue();
    const [categories, setCategories] = useState([])
    const [unresolvedUsers, setUnresolvedUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState({search: null, page: pageNumber})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})

    useEffect(async () => {
        await Api().get(`/unresolved-users`).then(res => {
            setUnresolvedUsers(res.data)
        })
        await Api().get(`/categories`).then(res => {
            setCategories(res.data)
        })
    }, []);

    useEffect(() => {
        setFilter({...filter, page: pageNumber})
        setLoading(true)
        const delayQuery = setTimeout(async () => {
            await Api().get(`/employees?${query}`).then(res => {
                setUsers(res.data)
                setLoading(false)
            }).catch(e => {
                if (e.response.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.replace('/login')
                }
            })
        }, (query) ? 500 : 0)
        return () => clearTimeout(delayQuery)

    }, [addEmployeeDone, query, sendReqDone, pageNumber, resolved]);

    function filterSelect(e) {
        setFilter({...filter, search: e.target.value})
    }

    return (
        <div className='employees'>
            <h1>Employees</h1>
            <br/>
            <div className='topSection'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type='search' value={filter.search} placeholder='Search Employees' onChange={filterSelect}/>
                    <button className='searchIcon'><BsSearch size='20px' color='grey'/></button>
                </form>
                <button className='addEmployee' onClick={toggleEmployeeForm}>+ Add New Employee</button>
                {
                    unresolvedUsers.length === 0 ?
                        <button className='addEmployee '>
                            <Link to={'/employees/add-bulk'}>
                                {loading?<BeatLoader size={5} color={'#ffffff'}/>:'+ Add Bulk'}
                            </Link>
                        </button>
                        :
                        <button className='addEmployee '>
                            <Link to={'/resolve-users'}>
                                {loading? <BeatLoader size={5} color={'#ffffff'}/>:'Resolve Users'}
                            </Link>
                        </button>
                }
            </div>
            {/*{Employee List}*/}
            <EmployeesList
                loading={loading}
                users={users}
                search={filter.search}
            />
            {/*{Employee List}*/}

            {/*add employee modal*/}
            <Modal
                toggle={toggleEmployeeForm}
                visible={addEmployeeModal}
                component={<AddEmployee categories={categories}/>}
                className='addEmployeeContainer'
            />
            {/*add employee modal*/}
        </div>
    )
}

export default Employees
