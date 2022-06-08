import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider";
import {Controller, useForm} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PropTypes from "prop-types";

const AddEmployee = ({edit}) => {

    const [{}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false)
    let keys = ''
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        console.log('form', data)
    };

    useEffect(() => {
        if (edit) {
            keys = getValues()
            keys.email = 'alex@gmail.com'
            setValue("email", keys.email)
            console.log('keys', keys)
        }
    }, [keys]);


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name *</label>
                <input placeholder='First Name...'
                       {...register('firstName', {required: true})}
                       style={{border: errors.firstName && '1px solid red'}}
                />
                {errors.firstName && touchedFields && <p>First Name is required</p>}
                <label>Last Name *</label>
                <input placeholder='Last Name...'
                       {...register('lastName', {required: 'Last Name is required'})}
                       style={{border: errors.lastName && '1px solid red'}}
                />
                {errors.lastName && touchedFields && <p>{errors.lastName.message}</p>}
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
                    <input type='checkbox'{...register('car', {required: false})}/>
                    <label>Car </label>
                    <input type='checkbox'{...register('phone', {required: false})}/>
                    <label>Phone </label>
                    <input type='checkbox'{...register('internet', {required: false})}/>
                    <label>Internet </label>
                    <input type='checkbox'{...register('train', {required: false})}/>
                    <label>Train </label>
                </div>
                <h5>* marked fields are mandatory to fill</h5>
                <div className='flexButtons'>
                    <button onClick={() => {
                        dispatch(
                            {
                                type: "Set_EmployeeModal",
                                item: false,
                            })
                    }}
                    >Cancel
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
    edit: PropTypes.bool
}
