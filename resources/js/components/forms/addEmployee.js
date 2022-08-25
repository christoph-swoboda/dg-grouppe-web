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
                toast.success('Benutzerinformationen erfolgreich gespeichert');
                setLoading(false)
                dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone,})
                if (resolve && resolved) {
                    Api().delete(`unresolved-users/${resolved}`).then(res => {
                        dispatch({type: "SET_RESOLVED", item: null})
                    })
                }
                toggleEmployeeForm()
            })
            .catch(err => {
                setEmailError(err.response.data.errors)
                toast.error('Etwas ist schief gelaufen!!');
                setLoading(false)
            })
    }

    async function updateUser(data) {
        await Api().put(`/employees/${user.id}`, data)
            .then((res) => {
                toast.success('Benutzerinformationen erfolgreich gespeichert');
                setLoading(false)
                dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone})
                toggleEmployeeForm()
            })
            .catch(err => {
                setLoading(false)
                setEmailError(err.response.data.errors)
                toast.error('Etwas ist schief gelaufen! ');
            })
    }

    return (
        <div>
            <h2 className='centerItem'>{edit ? 'Mitarbeiter Bearbeiten' : 'Neuen Mitarbeiter Hinzufügen'}</h2>
            {/*<br/>*/}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Vorname *</label>
                <input placeholder='Vorname...'
                       {...register('first_name', {required: true})}
                       style={{border: errors.first_name && '1px solid red'}}
                />
                {errors.first_name && touchedFields && <p>Vorname ist erforderlich</p>}
                <label>Nachname *</label>
                <input placeholder='Nachname...'
                       {...register('last_name', {required: 'Nachname ist erforderlich'})}
                       style={{border: errors.last_name && '1px solid red'}}
                />
                {errors.last_name && touchedFields && <p>{errors.last_name.message}</p>}
                <label>E-Mail *</label>
                <input disabled={edit} placeholder='E-Mail'
                       {...register('email', {
                           required: 'E-Mail ist erforderlich',
                           pattern: {
                               value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                               message: 'Bitte geben Sie eine gültige E-Mail ein',
                           },
                       })}
                       type="email"
                       required
                       style={{border: errors.email && '1px solid red'}}
                />
                {errors.email && touchedFields && <p>{errors.email.message}</p>}
                {emailError && <p>{emailError.email}</p>}

                <label>Passwort </label>
                <input placeholder='Eingabe Passwort'
                    // hidden={edit}
                       type={!resolve ? 'password' : 'text'}
                       autoFocus
                       {...register('password', {
                           required: !edit,
                           pattern: {
                               value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                               message: 'Mindestens acht Zeichen, mindestens ein Großbuchstabe, ein Kleinbuchstabe und eine Zahl',
                           },
                       })}
                />
                {errors.password && touchedFields && <p>{errors.password.message}</p>}

                <label>Geschlecht *</label>
                <select
                    {...register("gender", {required: true})}>
                    <option value="">Wählen Sie Geschlecht...</option>
                    <option value='m'>Männlich</option>
                    <option value='f'>Weiblich</option>
                    <option value='o'>Andere</option>
                </select>
                <label htmlFor="phone_number">Rufnummer *</label>
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
                    {errors.phone && <p>Ungültige Telefonnummer</p>}
                </div>
                <label>Adresse *</label>
                <input placeholder='St, Stadt, Land'
                       {...register('address', {required: true})}
                       style={{border: errors.address && '1px solid red'}}
                />
                {errors.address && touchedFields && <p>Adresse ist erforderlich</p>}
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
                {errors.categories && touchedFields && <p>Wählen Sie mindestens einen Typ für diesen Benutzer</p>}
                <h5>* Die markierten Felder müssen ausgefüllt werden</h5>
                <div className='flexButtons'>
                    <button onClick={() => {
                        dispatch({type: "Set_EmployeeModal", item: false,})
                    }}>
                        Abbrechen
                    </button>
                    <input
                        className={(isValid) ? 'enabled' : 'disabled'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? !edit ? 'Neu Hinzufügen' : 'Benutzer Aktualisieren' :
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
