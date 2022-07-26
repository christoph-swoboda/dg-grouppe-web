import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";
import Api from "../../api/api";
import {toast} from "react-toastify";
import useModal from "../../hooks/useModal";

const AddEmployee = ({edit, categories, user, credentials}) => {

    const [{addEmployeeDone}, dispatch] = useStateValue();
    const {toggleEmployeeForm} = useModal();
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    let keys = ''
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

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
                toggleEmployeeForm()
            })
            .catch(err => {
                setEmailError(err.response.data.errors)
                toast.error('Something went wrong! ');
                setLoading(false)
            })
    }

    async function updateUser(data) {
        await Api().put(`/employees/${credentials.id}`, data)
            .then((res) => {
                toast.success('User Info Saved Successfully');
                setLoading(false)
                dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone,})
                toggleEmployeeForm()
            })
            .catch(err => {
                setEmailError(err.response.data.errors)
                toast.error('Something went wrong! ');
                setLoading(false)
            })
    }

    useEffect(() => {
        if (edit) {
            keys = getValues()
            setValue("email", user.email)
            setValue("first_name", user.employees.first_name)
            setValue("last_name", user.employees.last_name)
            setValue("address", user.employees.address)
            setValue("phone-input", user.employees.phone)
            setValue("gender", user.employees.gender)
            setValue("categories", user.employees.types?.map(t => t.id.toString()))
        }
    }, [keys]);

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
                <label>Gender *</label>
                <select
                    {...register("gender", {required: true})}>
                    <option value="">Choose Gender...</option>
                    <option value='m'>Male</option>
                    <option value='f'>Female</option>
                    <option value='o'>Others</option>
                </select>
                <label htmlFor="phone-input">Phone Number *</label>
                <div style={{marginLeft: '1rem'}}>
                    <Controller
                        name="phone-input"
                        control={control}
                        rules={{required: true}}
                        render={({field: {onChange, value}}) => (
                            <PhoneInput
                                value={value}
                                onChange={onChange}
                                defaultCountry="DE"
                                id="phone-input"
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
                                <label>{cat.title} </label>
                            </div>
                        ))
                    }
                </div>
                {errors.categories && touchedFields && <p>Choose at least one type for this user</p>}
                <h5>* marked fields are mandatory to fill</h5>
                <div className='flexButtons'>
                    <button onClick={() => {
                        dispatch({type: "Set_EmployeeModal", item: false,})
                    }}>Cancel
                    </button>
                    <input
                        className={(isValid) ? 'enabled' : 'disabled'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? !edit ? 'Add New User' : 'Update User' : 'saving...'}
                    />
                </div>
            </form>
        </div>
    )
}

export default AddEmployee

AddEmployee.propTypes = {
    edit: PropTypes.bool,
    categories: PropTypes.array,
    credentials: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}
