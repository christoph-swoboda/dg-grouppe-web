import React, {useState, useEffect} from "react";
import {AiFillEdit} from "react-icons/ai";
import Api from "../../api/api";
import Modal from "../../components/modal";
import AddEmployee from "../../components/forms/addEmployee";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";

const ResolveUsersTable = ({
                               id,
                               first_name,
                               last_name,
                               email,
                               password,
                               address,
                               phone_number,
                               phone,
                               internet,
                               car,
                               train,
                               gender,
                               categories
                           }) => {

    const {toggleEmployeeForm} = useModal();
    const [{addEmployeeModal}] = useStateValue();
    const [user, setUser] = useState([])
    const [{}, dispatch] = useStateValue();

    async function resolve() {
        Api().get(`unresolved-users/${id}`).then(res => {
            setUser(res.data)
        }).finally(res=>{
            toggleEmployeeForm()
            dispatch({type: "SET_RESOLVED", item: id})
        })
    }

    return (
        <tbody>
        <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{password}</td>
            <td>{gender}</td>
            <td>{phone_number}</td>
            <td>{address}</td>
            <td>{phone}</td>
            <td>{internet}</td>
            <td>{car}</td>
            <td>{train}</td>
            <td style={{cursor: 'pointer'}} onClick={resolve}>
                <AiFillEdit size='2rem' color={'rgba(66,148,71,0.93)'}/>
            </td>
        </tr>
        <Modal
            toggle={toggleEmployeeForm}
            visible={addEmployeeModal}
            component={<AddEmployee categories={categories} resolve user={user}/>}
            className='addEmployeeContainer'
        />
        </tbody>
    )
}

export default ResolveUsersTable
