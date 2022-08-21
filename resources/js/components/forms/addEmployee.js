import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import Api from "../../api/api";
import {toast} from "react-toastify";
import useModal from "../../hooks/useModal";
import {BeatLoader} from "react-spinners";

const AddEmployee = ({edit, categories, user, resolve}) => {

    const [{addEmployeeDone, resolved}, dispatch] = useStateValue();
    const {toggleEmployeeForm} = useModal();
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [userCategories, setUserCategories] = useState([])
    const [phone, setPhone] = useState([])
    const [internet, setInternet] = useState([])
    const [car, setCar] = useState([])
    const [train, setTrain] = useState([])
    let keys = ''
    const {
        register, getValues, setValue, handleSubmit, formState, formState: {errors, touchedFields},
        control
    } = useForm({mode: 'onBlur', reValidateMode: 'onChange'});
    const {isValid} = formState;


    useEffect(() => {
        if (resolve) {
            setUserCategories([...phone, ...internet, ...car, ...train])
        }
    }, [phone, car, train, internet]);

    useEffect(() => {
        keys = getValues()
        document.getElementsByName('first_name')[0].focus();

        if (edit) {
            setValue("email", user.email)
            setValue("first_name", user.employees.first_name)
            setValue("last_name", user.employees.last_name)
            setValue("address", user.employees.address)
            setValue("phone_number", user.employees.phone)
            setValue("gender", user.employees.gender)
            setValue("categories", user.employees.types?.map(t => t.id.toString()))
        }
        if (resolve) {
            setValue("email", user.email)
            setValue("first_name", user.first_name)
            setValue("last_name", user.last_name)
            setValue("address", user.address)
            setValue("password", user.password)
            setValue("phone_number", user.phone_number)
            setValue("gender", user.gender)
            user.phone === 'y' && setPhone([...phone, 1])
            user.internet === 'y' && setInternet([...internet, 2])
            user.car === 'y' && setCar([...car, 3])
            user.train === 'y' && setTrain([...train, 4])
        }

    }, [keys, user]);

    useEffect(() => {
        keys = getValues()
        if (resolve) {
            setValue("categories", userCategories?.map(t => t.toString()))
            Object.keys(keys).map(k => {
                document.getElementsByName(k)[0]?.focus();
            })
            document.getElementsByName('first_name')[0].focus();
        }
    }, [userCategories]);


    const onSubmit = async (data) => {
        setLoading(true)
        if (edit) {
            await updateUser(data)
        } else {
            await saveUser(data)
        }
    };

    async function saveUser(data) {
        await Api().post(`/employees`, data)
            .then((res) => {
                toast.success('User Info Saved Successfully');
                setLoading(false)
                dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone,})
                if (resolve && resolved) {
                    Api().delete(`unresolved-users/${resolved}`).then(res => {
                        dispatch({type: "SET_RESOLVED", item: null})
                        console.log('deleted')
                    })
                }
                toggleEmployeeForm()
            })
            .catch(err => {
                setEmailError(err.response.data.errors)
                toast.error('Something went wrong!');
                setLoading(false)
            })
    }

    async function updateUser(data) {
        await Api().put(`/employees/${user.id}`, data)
            .then((res) => {
                toast.success('User Info Saved Successfully');
                setLoading(false)
                dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone})
                toggleEmployeeForm()
            })
            .catch(err => {
                setLoading(false)
                setEmailError(err.response.data.errors)
                toast.error('Something went wrong! ');
            })
    }

    return (
        <div>
            <h2 className='centerItem'>{edit ? 'Edit Employee' : 'Add New Employee'}</h2>
            {/*<br/>*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name *</label>
                <input placeholder='First Name...'
                       {...register('first_name', {required: true})}
                       style={{border: errors.first_name && '1px solid red'}}
                />
                {errors.first_name && touchedFields && <p>First Name is required</p>}
                <label>Last Name *</label>
                <input placeholder='Last Name...'
                       {...register('last_name', {required: 'Last Name is required'})}
                       style={{border: errors.last_name && '1px solid red'}}
                />
                {errors.last_name && touchedFields && <p>{errors.last_name.message}</p>}
                <label>Email *</label>
                <input disabled={edit} placeholder='Yourmail@domain'
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
                {emailError && <p>{emailError.email}</p>}

                <label>Password </label>
                <input placeholder='Enter Password'
                    // hidden={edit}
                       type={!resolve ? 'password' : 'text'}
                       autoFocus
                       {...register('password', {
                           required: !edit,
                           pattern: {
                               value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                               message: 'Min eight characters, at least one uppercase, one lowercase letter and one number',
                           },
                       })}
                />
                {errors.password && touchedFields && <p>{errors.password.message}</p>}

                <label>Gender *</label>
                <select
                    {...register("gender", {required: true})}>
                    <option value="">Choose Gender...</option>
                    <option value='m'>Male</option>
                    <option value='f'>Female</option>
                    <option value='o'>Others</option>
                </select>
                <label htmlFor="phone_number">Phone Number *</label>
                <div style={{marginLeft: '1rem'}}>
                    <Controller
                        name="phone_number"
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput
                                value={value}
                                onChange={onChange}
                                defaultCountry="DE"
                                id="phone_number"
                            />
                        )}
                    />
                    {errors.phone && <p>Invalid Phone Number</p>}
                </div>
                <label>Address *</label>
                <input placeholder='St, Town, Country'
                       {...register('address', {required: true})}
                       style={{border: errors.address && '1px solid red'}}
                />
                {errors.address && touchedFields && <p>Address is required</p>}
                <div className='flex'>
                    {
                        categories.map(cat => (
                            <div className='flex' key={cat.id}>
                                <input type='checkbox' value={cat.id}
                                       {...register(`categories`, {required: true})}
                                />
                                <label style={{textTransform: 'capitalize'}}>{cat.title} </label>
                            </div>
                        ))
                    }
                </div>
                {errors.categories && touchedFields && <p>Choose at least one type for this user</p>}
                <h5>* marked fields are mandatory to fill</h5>
                <div className='flexButtons'>
                    <button onClick={() => {
                        dispatch({type: "Set_EmployeeModal", item: false,})
                    }}>
                        Cancel
                    </button>
                    <input
                        className={(isValid) ? 'enabled' : 'disabled'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? !edit ? 'Add New User' : 'Update User' :
                            <BeatLoader size={5} color={'#ffffff'}/>}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddEmployee

AddEmployee.propTypes = {
    edit: PropTypes.bool,
    resolve: PropTypes.bool,
    categories: PropTypes.array,
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}
