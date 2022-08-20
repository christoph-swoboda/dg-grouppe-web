import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider"
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai"
import Api from "../../api/api"
import {toast} from "react-toastify"
import {read, utils} from 'xlsx'
import '../../style/addBulmEmployee.scss'
import {useNavigate} from "react-router";

const AddBulkEmployee = () => {

    const [{addEmployeeDone}, dispatch] = useStateValue()
    const [data, setData] = useState([])
    const [failedData, setFailedData] = useState([])
    const [unresolvedUser, setUnresolvedUser] = useState([])
    const [resolvedUser, setResolvedUser] = useState([])
    const [error, setError] = useState([])
    const [emailError, setEmailError] = useState([])
    const [nameError, setNameError] = useState([])
    const [passError, setPassError] = useState([])
    const [genderError, setGenderError] = useState([])
    const [cellNoError, setCellNoError] = useState([])
    const [phoneError, setPhoneError] = useState([])
    const [internetError, setInternetError] = useState([])
    const [carError, setCarError] = useState([])
    const [trainError, setTrainError] = useState([])
    const [emailCopyIndex, setEmailCopyIndex] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const formatLink = process.env.EXCELFORMATLINK
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const validPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    //set resolved and unresolved user's data array on every error found
    useEffect(() => {
        //filter the duplicates in array that contains all the error rows
        let filtered = filterByEmail(failedData)
        setUnresolvedUser(filtered)
        //subtract the array that doesn't contain any error
        let intersection = data.filter(x => !filtered.includes(x))
        setResolvedUser(intersection)
        console.log('unresolved users: ', filtered)
        console.log('resolved users: ', intersection)
    }, [failedData, data]);

    //create an array with all the rows that contains an error
    useEffect(() => {
        setFailedData([...failedData, ...nameError, ...emailError, ...passError, ...genderError, ...cellNoError, ...trainError, ...phoneError, ...internetError, ...carError])
    }, [nameError, emailError, passError, genderError, cellNoError, carError, phoneError, internetError, trainError]);

    useEffect(() => {
        setEmailCopyIndex([...emailCopyIndex, ...error])
    }, [error]);

    useEffect(() => {
        console.log('emailCopyIndex', emailCopyIndex)
    }, [emailCopyIndex]);


    //import and process the .xlsx, or .csv file
    const handleImport = (event) => {
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    let newRows = [];
                    rows.map((row, index) => {
                        newRows.push({
                            first_name: row?.first_name,
                            last_name: row?.last_name,
                            email: row?.email,
                            password: row?.password?.toString(),
                            gender: row?.gender,
                            phone_number: row?.phone_number?.toString(),
                            address: row?.address,
                            phone: row?.phone,
                            internet: row?.internet,
                            car: row?.car,
                            train: row?.train,
                        });
                    })
                    //filter out the duplicates from file
                    let filtered = filterByEmail(newRows)
                    setData(filtered)

                    //checking every row for possible errors, and push the whole row to an array
                    filtered.map((r, index) => {
                        if (!r.email || !validateEmail(r.email)) {
                            setEmailError([...emailError, r])
                        }
                        if (!r.first_name) {
                            setNameError([...nameError, r])
                        }
                        if (!r.password || !validatePass(r.password)) {
                            setPassError([...passError, r])
                        }
                        if (!r.gender || (r.gender !== 'f' && r.gender !== 'm')) {
                            setGenderError([...genderError, r])
                        }
                        if (!r.phone_number) {
                            setCellNoError([...cellNoError, r])
                        }
                        if (!r.phone || (r.phone !== 'y' && r.phone !== 'n')) {
                            setPhoneError([...phoneError, r])
                        }
                        if (!r.internet || (r.internet !== 'y' && r.internet !== 'n')) {
                            setInternetError([...internetError, r])
                        }
                        if (!r.car || (r.car !== 'y' && r.car !== 'n')) {
                            setCarError([...carError, r])
                        }
                        if (!r.train || (r.train !== 'y' && r.train !== 'n')) {
                            setTrainError([...trainError, r])
                        }
                    })
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const validateEmail = (email) => {
        return (email.match(validEmailRegex))
    };
    const validatePass = (pass) => {
        return (pass.match(validPassRegex))
    };

    function filterByEmail(rows) {
        const emptyArray = [];
        return rows.reduce(function (all, curr) {
            const index = emptyArray.indexOf(curr.email);
            if (index >= 0) {
                return all
            } else {
                emptyArray.push(curr.email)
                return all.concat(curr);
            }
        }, []);
    }

    function closeModal() {
        navigate('/employees')
    }

    async function upload() {
        setLoading(true)

        await Api().post(`/employees/bulk/${JSON.stringify(unresolvedUser)}`, resolvedUser).then(res => {
            toast.success('Employees Added')
            //update states for reloading data after the upload operation
            dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone,})
        }).catch(er => {
            console.log('e', er.response.data)
            let err = Object.values(er.response.data.errors)
            err.map(e => {
                let errorInIndex = e.toString().split('.')[0]
                setError([...error, errorInIndex])
                toast.error('Already Existing Emails Found!! Please Provide Unique Emails')
            })
        })
        setLoading(false)
    }

    function removeFile() {
        //reset every state for data arrays
        setData([])
        setResolvedUser([])
        setUnresolvedUser([])
        setFailedData([])
        setPassError([])
        setGenderError([])
        setCellNoError([])
        setPhoneError([])
        setCarError([])
        setInternetError([])
        setTrainError([])
        setEmailCopyIndex([])
        setError([])
    }

    return (
        <div className='addBulkEmployeeContainer'>
            <a hidden={data.length > 0} href={formatLink} target='_blank'>Format/Template For Excel File</a>
            {
                data.length === 0 &&
                <div className='defaultDiv'>
                    {/*<input type="file" id="inputGroupFile" onChange={change} hidden/>*/}
                    <input type="file" hidden name="file" className="custom-file-input" id="inputGroupFile" required
                           onChange={handleImport}
                           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <label htmlFor="inputGroupFile"> <AiOutlinePlusCircle size={40}/>Upload Formatted Excel File
                    </label>

                </div>
            }
            <div style={{
                display: data.length === 0 ? 'none' : 'flex',
                margin: '0 1rem',
                color: 'darkred',
                cursor: 'pointer'
            }}
                 onClick={removeFile}
            >
                <h2 style={{margin: '-2px 10px 0 0', color: 'black'}}>Remove File</h2> <AiFillDelete/>
            </div>
            <div className='tableDiv' hidden={data.length === 0}>
                <table className='displayExcel'>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Internet</th>
                        <th>Car</th>
                        <th>Train</th>
                    </tr>
                    </thead>
                    {
                        data?.map((d, index) => (// index===0 &&
                            <tbody>
                            <tr>
                                <td className={!d.first_name && 'error'}>{d.first_name}</td>
                                <td className={!d.last_name && 'error'}>{d.last_name}</td>
                                <td className={(!d.email || !d.email.match(validEmailRegex) || emailCopyIndex.includes(index.toString())) && 'error'}>{d.email}</td>
                                <td className={(!d.password || !d.password.match(validPassRegex)) && 'error'}>{d.password}</td>
                                <td className={(!d.gender || (d.gender !== 'f' && d.gender !== 'm')) && 'error'}>{d.gender}</td>
                                <td className={!d.phone_number && 'error'}>{d.phone_number}</td>
                                <td className={!d.address && 'error'}>{d.address}</td>
                                <td className={(!d.phone || (d.phone !== 'y' && d.phone !== 'n')) && 'error'}>{d.phone}</td>
                                <td className={(!d.internet || (d.internet !== 'y' && d.internet !== 'n')) && 'error'}>{d.internet}</td>
                                <td className={(!d.car || (d.car !== 'y' && d.car !== 'n')) && 'error'}>{d.car}</td>
                                <td className={(!d.train || (d.train !== 'y' && d.train !== 'n')) && 'error'}>{d.train}</td>
                            </tr>
                            {/*<br/>*/}
                            </tbody>
                            // <input value={d}/>
                        ))}
                </table>
            </div>

            <div className='buttons'>
                <button onClick={closeModal}>Cancel</button>
                <button className={data.length > 0 ? 'active' : 'inactive'}
                        onClick={upload}
                        disabled={(data.length === 0)}
                >
                    Upload
                </button>
            </div>
        </div>
    )
}

export default AddBulkEmployee
