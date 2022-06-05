import React from "react"
import '../style/navBar.scss'
import NavItems from "../helpers/navItems";

const Navbar = () => {

    const pathName=window.location.pathname.split('/').pop()

    return (
        <div>
            <ul className='navUL'>
                    <p className='logo'>DG GRUPPE |||</p>
                {
                    NavItems?.map(item => (
                        <div
                            className={pathName === item.title ? 'activeHr' : 'inActiveHr'}
                            key={item.id}
                        >
                            <li
                                className={pathName === item.title ? 'active' : 'inActive'}
                            >
                                {item.title}
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
