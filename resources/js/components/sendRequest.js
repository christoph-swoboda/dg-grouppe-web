import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {Controller, useForm} from "react-hook-form";
import {useStateValue} from "../states/StateProvider";
import Api from "../api/api";
import {toast} from "react-toastify";

const SendRequest = ({title, types, user, name}) => {
    const [period, setPeriod] = useState()
    const [type, setType] = useState()
    const [{sendReqModal, sendReqDone}, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false)

    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        console.log('data', data)
        setLoading(true)
        Api().post('/requests', data)
            .then(res => {
                if(res.status===201){
                    toast.success('Request Sent Successfully')
                    dispatch({type: "Set_SendReqDone", item: !sendReqDone})
                }
                else if(res.status===202){
                    toast.warning('Request Already Exists')
                }
                setLoading(false)
                dispatch({type: "Set_SendReqModal", item: !sendReqModal})
            })
    };

    return (
        <div className='sendRequestContainer'>
            <h1 className='centerItem'>{title} To: <span> {name}</span></h1>
            <br/>
            <form>
                <input {...register('user')} value={user} hidden/>
                <label>Select Type </label>
                <div className='flex'>
                    {
                        types.map(cat => (
                            <div className='flex' key={cat.id}>
                                <input type='checkbox' defaultChecked value={cat.id}{...register(`types`)}
                                       onChange={(e) => setType(e.target.value)}
                                />
                                <label>{cat.title} </label>
                            </div>
                        ))
                    }
                </div>
                <label>Select Period </label>
                <select   {...register("period")}
                          onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value={'0'}>Period: Current</option>
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
                    {(!loading) ? 'Send' : 'sending...'}
                </button>
            </form>

            <button className='cancel' onClick={() => dispatch({type: "Set_SendReqModal", item: false,})}>
                Cancel
            </button>
        </div>
    )
}

export default SendRequest
