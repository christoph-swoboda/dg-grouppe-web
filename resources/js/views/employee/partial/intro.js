import React, {useEffect, useState} from "react"
import useModal from "../../../hooks/useModal";
import {RiUserSettingsLine} from "react-icons/ri";
import {BeatLoader} from "react-spinners";
import avatar from "../../../assets/1.jpg";

const Intro = ({user, printing}) => {
    const {toggleEmployeeForm} = useModal();
    const [lastActive, setLastActive] = useState(0)

    useEffect(() => {
        let date = new Date(user.updated_at)
        let now = new Date()
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setLastActive(diffDays)
    }, []);

    return (
        <div className='intro'>
            {
                user.employees?.image ?
                    <img hidden={!user} src={`/${user.employees?.image}`}/>
                    :
                    <img src={avatar}/>
            }
            <div className='userName'>
                <h2>
                    {
                        !user.id ?
                            <BeatLoader size={10} color={'#000000'}/>
                            :
                            `${user.employees?.first_name} ${user.employees?.last_name}`
                    }
                </h2>
                <h3 style={{minWidth: '130px'}}>{user.company}</h3>
            </div>
            <h4 onClick={toggleEmployeeForm}><RiUserSettingsLine color='black' size='8rem'/></h4>
            <h3><span>Types: </span>

                {
                    !user.id ?
                        <BeatLoader size={10} color={'#000000'}/>
                        :
                        user.employees?.types?.map((type, index) => type.title + (index ? ' ' : ', '))
                }
            </h3>
            <h3><span>Status:
                {
                    !user.id ?
                        <BeatLoader size={10} color={'#000000'}/>
                        :
                        <>
                            {lastActive > 30 ? ' Offline ' : ' Online '}
                            <span className='lightFont'>
                                 ( Last Active On {new Date(user.updated_at).toLocaleDateString()})
                            </span>
                        </>
                }
            </span>

            </h3>
            <button hidden={printing} disabled={user.length === 0} onClick={toggleEmployeeForm}>Edit User</button>
        </div>
    )
}

export default Intro
