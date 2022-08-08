import React, {useEffect, useRef, useState} from "react";
import '../../style/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import '../../style/navBar.scss'
import Api from "../../api/api";

const Navbar = () => {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const path = useLocation()
    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }
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
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

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
        <nav ref={modalRef} hidden={path.pathname === '/login'}>
            <ul className="list">
                <Link to="/dashboard" className='logo'>DG GRUPPE |||</Link>
                {
                    (toggleMenu || screenWidth > 500) && (
                        <>
                            <Link to={'/'} onClick={toggleNav}>
                                <li className={`items ${path.pathname === '/' && 'text-mainBlue'}`}>Dashboard</li>
                            </Link>

                            <Link to={'/employees'} onClick={toggleNav}>
                                <li className={`items ${path.pathname.includes('/employees') && 'text-mainBlue'}`}>Employees</li>
                            </Link>

                            <li className='userInfo'>
                                <img onClick={() => setModal(!modal)} hidden={!user} src={`/${user?.admins.image}`}/>
                                <p hidden={!user} onClick={() => setModal(!modal)}>{user?.admins.first_name}</p>
                                <p><AiOutlineDown size={'20px'} onClick={() => setModal(!modal)}/></p>
                            </li>
                        </>
                    )
                }
            </ul>
            <p className={modal ? 'modal-logout' : 'hide'}>
                <button onClick={logout}>Log Out</button>
            </p>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu size={'30px'}/></button>
        </nav>
    )
}

export default Navbar
