import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router'
import '../../style/registration.scss'
import axios from "axios"
import Api from "../../api/api";


const Register = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setRepeatPassword] = useState('');
    const api = process.env.MIX_API;
    const [errors, setErrors] = useState([]);

    const Reg = async () => {

        const Data = new FormData();
        Data.append('firstName', firstName);
        Data.append('lastName', lastName);
        Data.append('email', email);
        Data.append('password', password);
        Data.append('password_confirmation', password_confirmation);

        await Api().post(`/register`, Data
        ).then((response) => {
            window.localStorage.setItem('user', JSON.stringify(response.data));
            // navigate('/home')
            window.location.replace('/login')

        }).catch((e) => {
            setErrors(e.response.data.errors)
        })

    }

    return (
        <div className='login'>
            <div className='login-box'>
                <input type='text'
                       name='firstName'
                       placeholder='first name' onChange={(e => setFirstName(e.target.value))}/>
                <br/>
                <br/>
                {
                    (errors?.firstName) ?
                        <p>{errors?.firstName}</p>
                        :
                        ''
                }
                <input type='text'
                       name='lastName'
                       placeholder='last name' onChange={(e => setLastName(e.target.value))}/>
                <br/>
                <br/>
                {
                    (errors?.lastName) ?
                        <p>{errors?.lastName}</p>
                        :
                        ''
                }
                <input type='email'
                       name='email'
                       placeholder='email' onChange={(e => setEmail(e.target.value))}/>
                <br/>
                <br/>
                {
                    (errors?.email) ?
                        <p>{errors?.email}</p>
                        :
                        ''
                }
                <input type='password'
                       name='password'
                       placeholder='password (uppercase,lowercase and number: min 10)' onChange={(e => setPassword(e.target.value))}/>
                <br/>
                <br/>
                {
                    (errors?.password) ?
                        <p>{errors?.password}</p>
                        :
                        ''
                }
                <input type='password'
                       name='password_confirmation'
                       placeholder='confirm Password' onChange={(e => setRepeatPassword(e.target.value))}/>
                <br/>
                <br/>
                {
                    (errors?.repeatPassword) ?
                        <p>{errors?.repeatPassword}</p>
                        :
                        ''
                }
                <button style={{backgroundColor: '#75a85d'}} onClick={Reg}>Sign Up</button>
                <br/>
                <h3>Already have an account?</h3>
                <span>
                    <button style={{backgroundColor: '#cccccc'}}
                            onClick={() => {
                                navigate('/login')
                            }}>Log In
                    </button>
                </span>
            </div>

        </div>
    )
}

export default Register
