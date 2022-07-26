import React, {useEffect, useRef, useState} from "react"
import '../../style/navBar.scss'
import NavItems from "../../helpers/navItems";
import {Link, useLocation} from "react-router-dom";
import Api from "../../api/api";
import {AiOutlineDown} from "react-icons/ai";

const Navbar = () => {

    const router = useLocation();
    const pathName = router.pathname.split('/')
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState()
    const modalRef = useRef();

    useEffect(async () => {
        await Api().get('admin')
            .then(res => {
                setUser(res.data)
            })
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!modalRef.current.contains(e.target)) {
                setModal(false)
            }
        })
    }, []);

    async function logout() {
        await Api().post('/logout')
            .then(res => {
                window.localStorage.clear();
                window.location.replace('/login')
            })
    }

    return (
        <div ref={modalRef}>
            <ul className='navUL'>
                <Link to="/dashboard" className='logo'>DG GRUPPE |||</Link>
                {
                    NavItems?.map(item => (
                        <div
                            className={pathName.includes(item.path) ? 'activeHr' : 'inActiveHr'}
                            key={item.id}
                        >
                            <li
                                className={pathName.includes(item.path) ? 'active' : 'inActive'}
                            >
                                <Link to={item.path} className='logo'>
                                    {item.title}
                                </Link>
                            </li>
                            <hr/>
                        </div>
                    ))
                }
                <div className='user'>
                    <img hidden={!user} src={`/${user?.admins.image}`}/>
                    <p hidden={!user} onClick={() => setModal(!modal)}>{user?.admins.first_name}</p>
                    <p style={{cursor:'pointer'}}><AiOutlineDown onClick={() => setModal(!modal)}/></p>
                </div>
            </ul>
            <p className={modal ? 'modal-logout' : 'hide'}>
                <button onClick={logout}>Log Out</button>
            </p>
        </div>
    )
}

export default Navbar
