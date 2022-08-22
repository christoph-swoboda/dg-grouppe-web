import React, {useEffect, useRef, useState} from "react";
import '../../style/navbar.css'
import {AiOutlineDown, AiOutlineMenu} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import '../../style/navBar.scss'
import Api from "../../api/api";
import logo from '../../assets/logo.png'
import avatar from '../../assets/1.jpg'

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
                <Link to="/dashboard" className='logo'><img src={logo} alt='logo'/></Link>
                {
                    (toggleMenu || screenWidth > 500) && (
                        <>
                            <Link to={'/dashboard'} onClick={toggleNav}>
                                <li className={`items ${path.pathname.includes('/dashboard') && 'text-bold'}`}>Dashboard</li>
                            </Link>

                            <Link to={'/employees'} onClick={toggleNav}>
                                <li className={`items ${path.pathname.includes('/employees') && 'text-bold'}`}>Employees</li>
                            </Link>

                            <li className='userInfo'>
                                {
                                    user?.admins.image ?
                                        <img onClick={() => setModal(!modal)} hidden={!user}
                                             src={`/${user?.admins.image}`}/>
                                        :
                                        <img onClick={() => setModal(!modal)} src={avatar}/>
                                }
                                <p hidden={user} onClick={() => setModal(!modal)}>Admin</p>
                                <p hidden={!user} onClick={() => setModal(!modal)}>{user?.admins.first_name}</p>
                                <p><AiOutlineDown size={'20px'} onClick={() => setModal(!modal)}/></p>
                            </li>
                        </>
                    )
                }
            </ul>
            <div className={modal ? 'modal-logout' : 'hide'}>
                <button onClick={logout}>Log Out</button>
                <Link to={'/settings'} onClick={() => setModal(false)}>Settings</Link>
            </div>
            <button onClick={toggleNav} className="btn"><AiOutlineMenu size={'30px'}/></button>
        </nav>
    )
}

export default Navbar
