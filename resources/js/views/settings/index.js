import React, {useEffect, useRef, useState} from "react"
import {useForm} from "react-hook-form"
import '../../style/settings.scss'
import Api from "../../api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {Editor} from 'react-draft-wysiwyg';
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import draftToHtmlPuri from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import {BeatLoader} from "react-spinners";
import {BsImage} from "react-icons/bs";

const Settings = ({settings}) => {

    const [{loadSettings}, dispatch] = useStateValue()
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState(null)
    const [information, setInformation] = useState(EditorState.createEmpty())
    const [faq, setFaq] = useState('')
    const [editFaq, setEditFaq] = useState(false)
    const {
        register, getValues, setValue, handleSubmit, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState
    const ref = useRef();

    useEffect(() => {
        setValue("faq", draftToHtmlPuri(convertToRaw(information.getCurrentContent())))
        setValue("app_version", settings.filter(s => s.keyword === 'app_version')[0]?.value)
        setValue("app_name", settings.filter(s => s.keyword === 'app_name')[0]?.value)
        // setValue("app_logo", settings.filter(s => s.keyword === 'app_logo')[0]?.value)

        setImg(settings.filter(s => s.keyword === 'app_logo')[0]?.value)
        setFaq(settings?.filter(s => s.keyword === 'faq')[0]?.value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
    }, [information, settings]);

    useEffect(() => {
        if (settings.filter(s => s.keyword === 'faq')[0]?.value) {
            const blocksFromHTML = htmlToDraft(settings.filter(s => s.keyword === 'faq')[0]?.value);
            const {contentBlocks, entityMap} = blocksFromHTML;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            setInformation(EditorState.createWithContent(contentState))
        } else {
            setInformation(EditorState.createEmpty())
        }

    }, [settings]);

    const onSubmit = async (data) => {
        console.log('data', Object.entries(data))

        setLoading(true)
        Api().post('settings', Object.entries(data)).then(res => {
            toast.success('Settings saved successfully')
            setLoading(false)
            dispatch({type: 'setLoadSettings', item: !loadSettings})
        }).catch(e => {
            toast.error('Something went wrong!!!')
            setLoading(false)
        })
        setEditFaq(false)
    };

    async function fileInput(e) {
        const file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            // await setValue("app_logo",file);
            reader.onloadend = async () => {
                setValue("app_logo", reader.result)
                setImg(reader.result)
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Something Went Wrong!');
        }
    }

    const Change = (contentState) => {
        setInformation(contentState)
    };

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
                <input hidden {...register('faq', {required: true})}/>
                <input hidden {...register('app_logo', {required: false})}/>
            </form>

            <div className='faqEdit' style={{textAlign: 'unset', fontSize: 'unset'}}>
                <label>{editFaq ? 'Editing FAQ page' : 'FAQ page '}</label>
                <button onClick={() => setEditFaq(!editFaq)}>{editFaq ? 'Cancel' : 'Edit'}</button>
                <div style={{maxHeight: '40vh', overflowY: 'scroll'}}>
                    <BeatLoader loading={settings.length === 0}/>
                    <div hidden={editFaq} dangerouslySetInnerHTML={{__html: faq}}/>
                </div>
            </div>

            <div className='faq' hidden={!editFaq}>
                {/*<div className='faq'>*/}
                <Editor
                    editorState={information}
                    onEditorStateChange={Change}
                />
                {errors.faq && <p>Provide The Information</p>}
            </div>

            <div className='uploadLogo'>
                <p>{`Change app logo  `}</p>
                <label ref={ref} htmlFor="fileInput"> <BsImage size={40} style={{cursor: "pointer"}}/> </label>
            </div>
            <input type='file'
                   name='image'
                   hidden
                   id="fileInput"
                   onChange={fileInput}
                   style={{border: errors.app_logo && '1px solid red'}}
            />
            <div className='logoContainer'>
                <img hidden={!img} src={img} alt='image'/>
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
