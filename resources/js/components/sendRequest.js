import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {Controller, useForm} from "react-hook-form";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import {toast} from "react-toastify";

const SendRequest = ({title, types, user, name}) => {
    const [period, setPeriod] = useState()
    const [{sendReqModal, sendReqDone}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false)

    const {
        register, handleSubmit, formState, formState: {},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        console.log('data', data)
        setLoading(true)
        Api().post('/requests', data).then(res => {
            if (res.status === 201) {
                toast.success('Anfrage erfolgreich gesendet')
                dispatch({type: "Set_SendReqDone", item: !sendReqDone})
            } else if (res.status === 202) {
                toast.warning('Anfrage ist bereits vorhanden')
            }
            setLoading(false)
            dispatch({type: "Set_SendReqModal", item: !sendReqModal})
        }).catch(e => {
            setLoading(false)
            toast.error('Etwas ist schief gelaufen...')
        })
    };

    return (
        <div className='sendRequestContainer'>
            <h1 className='centerItem'>{title} To: <span> {name}</span></h1>
            <br/>
            <form>
                <input {...register('user')} value={user} hidden/>
                <label>Typ Auswählen </label>
                <div className='flex'>
                    {
                        types.map(cat => (
                            <div className='flex' key={cat.id}>
                                <input type='checkbox' defaultChecked value={cat.id}{...register(`types`)}/>
                                <label>{cat.title} </label>
                            </div>
                        ))
                    }
                </div>
                <label>Zeitraum wählen </label>
                <select   {...register("period")}
                          onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value={'0'}>Zeitraum: Aktuell</option>
                    {
                        [1, 2, 3].map(period => (
                            <option key={period} value={period}>{period}</option>
                        ))
                    }
                </select>
                <div hidden={!period || period === '0'}>
                    <Controller
                        control={control}
                        name='year'
                        render={({field}) => (
                            <DatePicker
                                dateFormat="yyyy"
                                showYearPicker
                                placeholderText='Select A Year'
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                            />
                        )}
                    />
                </div>

                <br/><br/><br/>
                <button className='send' disabled={!isValid} type="submit" onClick={handleSubmit(onSubmit)}>
                    {(!loading) ? 'Senden Sie' : 'Senden...'}
                </button>
            </form>

            <button className='cancel' onClick={() => dispatch({type: "Set_SendReqModal", item: false,})}>
                Abbrechen
            </button>
        </div>
    )
}

export default SendRequest
