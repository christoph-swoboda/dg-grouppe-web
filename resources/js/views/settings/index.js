import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import RichTextEditor from 'react-rte'
import '../../style/settings.scss'
import Api from "../../api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";

const Settings = ({settings}) => {

    const [{loadSettings}, dispatch] = useStateValue()
    const [loading, setLoading] = useState(false)
    const [information, setInformation] = useState(RichTextEditor.createEmptyValue())
    // const [faq, setFaq] = useState('')
    // const [editFaq, setEditFaq] = useState(false)
    const {
        register, getValues, setValue, handleSubmit, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState

    useEffect(() => {
        setValue("faq", information.toString('html'))
        setValue("app_version", settings.filter(s => s.keyword === 'app_version')[0]?.value)
        setValue("app_name", settings.filter(s => s.keyword === 'app_name')[0]?.value)
        // setFaq(settings?.filter(s => s.keyword === 'faq')[0]?.value)
    }, [information, settings]);

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('settings', Object.entries(data)).then(res => {
            toast.success('Settings saved successfully')
            setLoading(false)
            dispatch({type: 'setLoadSettings', item: !loadSettings})
        }).catch(e => {
            toast.error('Something went wrong!!!')
            setLoading(false)
        })
        // setEditFaq(false)
    };

    const Change = (value) => {
        setInformation(value);
    };

    useEffect(() => {
        setInformation(settings.filter(s => s.keyword === 'faq')[0]?.value ? RichTextEditor.createValueFromString(settings.filter(s => s.keyword === 'faq')[0]?.value, 'html') : RichTextEditor.createEmptyValue())
    }, [settings]);

    function Edit() {
        // setEditFaq(!editFaq)
    }

    return (
        <div className='settingsContainer'>
            <h2>Settings</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='flex-column'>
                    <label>App Name *</label>
                    <input placeholder={errors.app_name && touchedFields ? 'App Name is required' : 'App Name'}
                           {...register('app_name', {required: true})}
                           style={{border: errors.app_name && '1px solid red'}}
                    />
                </div>
                <div className='flex-column'>
                    <label>App Version *</label>
                    <input placeholder={errors.app_version && touchedFields ? 'App Version is required' : 'App version'}
                           {...register('app_version', {required: true})}
                           style={{border: errors.app_version && '1px solid red'}}
                    />
                </div>
                <input hidden{...register('faq', {required: true})}/>
            </form>
            {/*<div className='faqEdit'>*/}
            {/*    <label>Frequently Asked Questions</label>*/}
            {/*    <button onClick={Edit}>{editFaq ? 'Cancel' : 'Edit'}</button>*/}
            {/*    <div hidden={editFaq} dangerouslySetInnerHTML={{__html: faq}}/>*/}
            {/*</div>*/}
            {/*<div className='faq' hidden={!editFaq}>*/}
            <div className='faq'>
                <label>FAQ</label>
                <RichTextEditor
                    value={information}
                    onChange={Change}
                />
                {errors.faq && <p>Provide The Information</p>}
            </div>
            <input
                className='enabled save'
                type="submit"
                onClick={handleSubmit(onSubmit)}
                value={(!loading) ? 'Save' : 'saving...'}
            />
        </div>
    )
}

export default Settings
