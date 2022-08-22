import React, {useEffect, useState} from "react"
import '../../style/resolveUsers.scss'
import Api from "../../api/api";
import ResolveUsersTable from "./table";
import {useStateValue} from "../../states/StateProvider";
import {BeatLoader} from "react-spinners";

const ResolveUsers = () => {

    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [{resolved}] = useStateValue();

    useEffect(async () => {
        await Api().get(`/categories`).then(res => {
            setCategories(res.data)
        })
        await Api().get(`/unresolved-users`).then(res => {
            setUsers(res.data)
        })
        setLoading(false)

    }, [resolved]);

    return (
        <div className='resolveUsersContainer'>
            <h1 hidden={!loading && users.length===0}>Resolve These Users</h1>
            <hr/>
            <table className='displayExcel'>
                <thead hidden={users.length===0}>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Internet</th>
                    <th>Car</th>
                    <th>Train</th>
                    <th>Resolve</th>
                </tr>
                </thead>
                {
                    users.length > 0 ?
                        users?.map((u, index) => (
                            <ResolveUsersTable
                                key={index}
                                id={u.id}
                                first_name={u.first_name}
                                last_name={u.last_name}
                                email={u.email}
                                password={u.password}
                                gender={u.gender}
                                phone_number={u.phone_number}
                                phone={u.phone}
                                internet={u.internet}
                                car={u.car}
                                address={u.address}
                                train={u.train}
                                categories={categories}
                            />
                        )) :
                        <h2 hidden={loading}>No user to resolve at the moment!!</h2>
                }
            </table>
            <br/>
            <BeatLoader size={15} color={'#000000'} loading={loading}/>
        </div>
    )
}

export default ResolveUsers
