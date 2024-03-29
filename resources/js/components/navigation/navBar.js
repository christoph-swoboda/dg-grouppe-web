import React from "react"
import '../../style/navBar.scss'
import NavItems from "../../helpers/navItems";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {

    const router =  useLocation();
    const pathName=router.pathname.split('/')
    console.log('path', pathName)

    return (
        <div>
            <ul className='navUL'>
                <Link to="/" className='logo'>DG GRUPPE |||</Link>
                {
                    NavItems?.map(item => (
                        <div
                            className={pathName.includes(item.path) ? 'activeHr' : 'inActiveHr'}
                            key={item.id}
                        >
                            <li
                                className={pathName.includes(item.path)? 'active' : 'inActive'}
                            >
                                <Link to={item.path} className='logo'>
                                    {item.title}
                                </Link>
                            </li>
                            <hr/>
                        </div>
                    ))
                }
                <p className='user'>User Name</p>
            </ul>
        </div>
    )
}

export default Navbar
