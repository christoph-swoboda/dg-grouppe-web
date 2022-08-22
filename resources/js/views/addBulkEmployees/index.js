import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider"
import {AiFillDelete, AiOutlinePlusCircle} from "react-icons/ai"
import Api from "../../api/api"
import {toast} from "react-toastify"
import {read, utils} from 'xlsx'
import '../../style/addBulmEmployee.scss'
import {useNavigate} from "react-router";
import {BeatLoader} from "react-spinners";

const Index = () => {

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
    const [noCategoryError, setNoCategoryError] = useState([])
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
    }, [failedData, data]);

    //create an array with all the rows that contains an error
    useEffect(() => {
        setFailedData([...failedData, ...nameError, ...emailError, ...passError, ...genderError, ...cellNoError, ...noCategoryError])
    }, [nameError, emailError, passError, genderError, cellNoError, noCategoryError]);

    useEffect(() => {
        setEmailCopyIndex([...emailCopyIndex, ...error])
    }, [error, emailError]);

    useEffect(() => {
        console.log('emerr', emailCopyIndex)
    }, [emailCopyIndex]);


    //import and process the .xlsx, or .csv file
    const handleImport = (e) => {
        const files = e.target.files;
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
                            first_name: row.first_name,
                            last_name: row.last_name,
                            email: row.email,
                            password: row.password?.toString(),
                            gender: row.gender,
                            phone_number: row.phone_number?.toString(),
                            address: row.address,
                            phone: row.phone ? row.phone : 'N/A',
                            internet: row.internet ? row.internet : 'N/A',
                            car: row.car ? row.car : 'N/A',
                            train: row.train ? row.train : 'N/A',
                            error: false,
                        });
                    })
                    //filter out the duplicates from file
                    let filtered = filterByEmail(newRows)
                    setData(filtered)

                    //checking every row for possible errors, and push the whole row to an array
                    filtered.map((r, index) => {
                        if (!r.email || !validateEmail(r.email)) {
                            setEmailError([...emailError, r])
                            r.error = true
                        }
                        if (!r.first_name) {
                            setNameError([...nameError, r])
                            r.error = true
                        }
                        if (!r.password || !validatePass(r.password)) {
                            setPassError([...passError, r])
                            r.error = true
                        }
                        if (!r.gender || (r.gender !== 'f' && r.gender !== 'm')) {
                            setGenderError([...genderError, r])
                            r.error = true
                        }
                        if (!r.phone_number) {
                            setCellNoError([...cellNoError, r])
                            r.error = true
                        }
                        if (r.train !== 'y' && r.phone !== 'y' && r.internet !== 'y' && r.car !== 'y') {
                            setNoCategoryError([...noCategoryError, r])
                            r.error = true
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
        let Data = unresolvedUser.concat(resolvedUser)
        await Api().post(`/employees/bulk`, Data).then(res => {
            toast.success('Employees Added')
            //update states for reloading data after the upload operation
            dispatch({type: "Set_EmployeeSaved", item: !addEmployeeDone})
            if (unresolvedUser.length > 0) {
                navigate('/resolve-users')
            } else {
                navigate('/employees')
            }
        }).catch(er => {
            let err = Object.values(er.response.data.errors)
            if (er.response.status === 422) {
                err.map(e => {
                    let errorInIndex = e.toString().split('.')[0]
                    setError([...error, errorInIndex])
                    toast.error('Invalid Existing Emails Found!! Please Provide Unique Emails')
                })
            } else {
                toast.error('Something Went Wrong!!!')
                setLoading(false)
            }

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
        setEmailCopyIndex([])
        setError([])
        setNoCategoryError([])
        setEmailError([])
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
                        data?.map((d, index) => (
                            <tbody>
                            <tr>
                                <td className={!d.first_name && 'error'}>{d.first_name}</td>
                                <td className={!d.last_name && 'error'}>{d.last_name}</td>
                                <td className={(!d.email || !d.email.match(validEmailRegex) || emailCopyIndex.includes(index.toString())) && 'error'}>{d.email}</td>
                                <td className={(!d.password || !d.password.match(validPassRegex)) && 'error'}>{d.password}</td>
                                <td className={(!d.gender || (d.gender !== 'f' && d.gender !== 'm')) && 'error'}>{d.gender}</td>
                                <td className={!d.phone_number && 'error'}>{d.phone_number}</td>
                                <td className={!d.address && 'error'}>{d.address}</td>
                                <td className={(d.train !== 'y' && d.phone !== 'y' && d.internet !== 'y' && d.car !== 'y') && 'error'}>{d.phone}</td>
                                <td className={(d.train !== 'y' && d.phone !== 'y' && d.internet !== 'y' && d.car !== 'y') && 'error'}>{d.internet}</td>
                                <td className={(d.train !== 'y' && d.phone !== 'y' && d.internet !== 'y' && d.car !== 'y') && 'error'}>{d.car}</td>
                                <td className={(d.train !== 'y' && d.phone !== 'y' && d.internet !== 'y' && d.car !== 'y') && 'error'}>{d.train}</td>
                            </tr>
                            </tbody>
                        ))}
                </table>
            </div>

            <div className='buttons'>
                <button onClick={closeModal}>Cancel</button>
                <button className={data.length > 0 ? 'active' : 'inactive'}
                        onClick={upload}
                        disabled={(data.length === 0)}
                >
                    {loading ? <BeatLoader size={5} color={'#ffffff'}/> : 'Upload'}
                </button>
            </div>
        </div>
    )
}

export default Index
