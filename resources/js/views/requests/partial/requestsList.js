import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import RequestsTable from "../../../components/requestsTable";
import {BeatLoader} from "react-spinners";
import Pagination from "react-js-pagination"
import {useStateValue} from "../../../states/StateProvider";

const RequestsList = ({bills, header, loading, slug}) => {

    const [{}, dispatch] = useStateValue();

    return (
        <div>
            {
                slug && slug !== header ?
                    ''
                    :
                    <div className='tableContainer'>
                        <h1 style={{textTransform: 'capitalize'}}>{header}</h1>

                        <div hidden={loading || bills?.data[0]?.bill}>
                            <h2>Keine Daten für diesen Bereich!!</h2>
                        </div>
                        {
                            loading ?
                                <div style={{minHeight:'20vh'}}>
                                    <BeatLoader size={10} color={'#000000'}/>
                                </div>
                                :
                                <table hidden={!bills?.data[0]?.bill}>
                                    <thead>
                                    <tr>
                                        <th>ID ANFORDEN</th>
                                        <th>NAME</th>
                                        <th>ANFORDEN</th>
                                        <th>ZEITRAUM</th>
                                        <th>DEADLINE</th>
                                        <th>STATUS</th>
                                        <th>ÜBERPRÜFEN</th>
                                    </tr>
                                    </thead>
                                    {
                                        bills?.data.map((req) => (
                                            req.bill &&
                                            <RequestsTable
                                                key={req.id}
                                                id={req.id}
                                                published={req.published}
                                                billId={req.id}
                                                user={req?.bill?.user_id}
                                                type={req?.type?.title}
                                                status={req?.status}
                                                responseImage={req?.response?.image}
                                                name={`${req?.bill?.user?.employees?.first_name} ${req?.bill?.user?.employees?.last_name}`}
                                                period={new Date(req?.bill?.created_at).getMonth() + 1}
                                                year={new Date(req?.bill?.created_at).getFullYear()}
                                                title={req?.bill?.title}
                                            />
                                        ))
                                    }
                                </table>
                        }
                        <div hidden={slug || !bills?.data[0]?.bill || loading} className='listBottom'>
                            <Link to={`/armaturenbrett/${header}`}>Alle Sehen</Link>
                        </div>
                        <div hidden={!slug}>
                            <Pagination
                                activePage={bills?.current_page ? bills?.current_page : 0}
                                itemsCountPerPage={bills?.per_page ? bills?.per_page : 0}
                                totalItemsCount={bills?.total ? bills?.total : 0}
                                onChange={(page) => {
                                    dispatch({type: "setPageNumber", item: page})
                                }}
                                innerClass='pagination'
                                linkClass='paginationItem'
                                activeLinkClass='activeLink'
                                disabledClass={'true'}
                                hideFirstLastPages
                                itemClassFirst='firstPage'
                                pageRangeDisplayed={8}
                                firstPageText="First Page"
                                lastPageText="Last Lage"
                            />
                        </div>
                    </div>
            }
        </div>
    )
}
export default RequestsList

RequestsList.propTypes = {
    bills: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    slug: PropTypes.string,
    header: PropTypes.string,
    count: PropTypes.number,
    loading: PropTypes.bool,
    status: PropTypes.number
}
