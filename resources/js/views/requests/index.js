import React, {useEffect, useState} from "react"
import '../../style/requests.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsCalendar3} from "react-icons/bs";
import RequestsList from "./partial/requestsList";
import Api from "../../api/api";
import qs from "qs"
import StatsCard from "../../components/statsCard";
import {useStateValue} from "../../states/StateProvider";

const Requests = ({slug}) => {

    const [{approve, pageNumber}] = useStateValue()
    const [filterDate, setFilterDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [bills, setBills] = useState([])
    const [filter, setFilter] = useState({year: null, period: null, slug: slug, page: pageNumber})
    const query = qs.stringify(filter, {encode: false, skipNulls: true})
    // const periodCount = process.env.MIX_PERIODCOUNT


    useEffect(() => {

        setFilter({...filter, page: pageNumber})

        setLoading(true)
        const delayQuery = setTimeout(async () => {
            await Api().get(`/requests?${query}`).then(res => {
                setBills(res.data)
                setLoading(false)
            }).catch(e => {
                if (e.response.status === 401) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    window.location.replace('/anmeldung')
                }
            })
        }, (query) ? 500 : 0)
        return () => clearTimeout(delayQuery)

    }, [query, approve, pageNumber]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setFilterDate(e);
        setFilter({...filter, year: new Date(e).getFullYear()})
    }

    return (
        <div className='requests'>
            <div hidden={slug}>
                <StatsCard openReq={bills?.open?.total} approvedReq={bills?.approved?.total}
                           rejectedReq={bills?.rejected?.total}/>
            </div>
            {/*<br/>*/}
            {/*filter*/}
            <div className='filters'>
                <div>
                    <h5 style={{marginLeft: '2vw'}}>Jahr Auswählen</h5>
                    <div className="yearInput" style={{position: 'relative', zIndex: '1'}} onClick={handleClick}>
                        <DatePicker selected={filterDate}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className={'thi'}
                                    placeholderText='Select A Year'
                                    onChange={handleChange}
                                    id='date'
                        />
                        <label htmlFor="date"> <BsCalendar3 size='3vh' color='grey'/></label>
                    </div>
                </div>
                <div>
                    <h5>Zeitraum Wählen</h5>
                    <select className='selectInput' onChange={(e) => setFilter({
                        ...filter,
                        period: e.target.value !== '' ? e.target.value : null
                    })}>
                        <option value={''}>Zeitraum: Alle</option>
                        {
                            [1, 2, 3].map(period => (
                                <option key={period} value={period}>{period}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/*filter*/}

            {/*list*/}
            <div className={!slug ? `requestsList` : 'requestsListNoBorder'}>
                <RequestsList slug={slug} loading={loading} status={1} header={'anhängig'} bills={bills?.open}/>
            </div>
            <div className={!slug ? `requestsList` : 'requestsListNoBorder'}>
                <RequestsList slug={slug} loading={loading} status={2} header={'bestätigt'} bills={bills?.approved}/>
            </div>
            <div className={!slug ? `requestsList` : 'requestsListNoBorder'}>
                <RequestsList slug={slug} loading={loading} status={3} header={'abgelehnt'} bills={bills?.rejected}/>
            </div>
            {/*list*/}

        </div>
    )
}

export default Requests
