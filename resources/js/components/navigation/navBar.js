import React from "react"
import '../../style/navBar.scss'
import NavItems from "../../helpers/navItems";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {

    const router =  useLocation();
    const pathName=router.pathname.split('/').pop()
    console.log('path', pathName)

    return (
        <div>
            <ul className='navUL'>
                <Link to="/" className='logo'>DG GRUPPE |||</Link>
                {
                    NavItems?.map(item => (
                        <div
                            className={pathName === item.title ? 'activeHr' : 'inActiveHr'}
                            key={item.id}
                        >
                            <li
                                className={pathName === item.title ? 'active' : 'inActive'}
                            >
                                <Link to={'/'+item.title} className='logo'>
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
