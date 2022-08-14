import React, {useState} from 'react'
import {useNavigate} from 'react-router'
import '../../style/registration.scss'
import authApi from "../../api/auth";
import Api from '../../api/api';
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";

const Login = () => {

    const navigate = useNavigate();
    const [Errors, setErrors] = useState([]);
    const [notFound, setNotFound] = useState('');
    const [loading, setLoading] = useState(false)
    let keys = ''
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        await authApi.login(data)
            .then((res) => {
                const Data = res.data
                const role = Data.user.role

                if (role==='1') {
                    if(Data.access_token){
                        const token = `${Data.token_type} ${Data.access_token}`
                        const user = Data.user
                        localStorage.setItem('token', token)
                        localStorage.setItem('user', JSON.stringify(user))
                    }
                    else{
                        toast.error('something_went_wrong')
                    }

                }
                else{
                    setLoading(false)
                    toast.error('User not authorized!!!')
                }
            })
            .catch(e => {
                toast.error(e.data?.message)
                setLoading(false)
            })

        let user = JSON.parse(window.localStorage.getItem('user'))
        if (user) {
            setErrors(user?.errors)
            if (user?.role === '1') {
                window.location.replace('/dashboard')
            } else {
                setLoading(false)
                toast.error('User not authorized!!!')
                navigate('/dashboard')
            }
        }
    };

    return (
        <div className='login'>
            <div className='login-box'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email *</label>
                    <input placeholder='Yourmail@domain'
                           {...register('email', {
                               required: 'Email is required',
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                   message: 'Please enter a valid email',
                               },
                           })}
                           type="email"
                           required
                           style={{border: errors.email && '1px solid red'}}
                    />
                    {errors.email && touchedFields && <p>{errors.email.message}</p>}
                    <label>Password *</label>
                    <input placeholder='Password'
                           type='password'
                           {...register('password', {required: 'your password is required'})}
                           style={{border: errors.password && '1px solid red'}}
                    />
                    {errors.password && touchedFields && <p>{errors.password.message}</p>}
                    <input
                        className={(isValid) ? 'enabled' : 'disabled'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? 'Log In' : 'Verifying...'}
                    />
                </form>
            </div>
        </div>
    )
}

export default Login
