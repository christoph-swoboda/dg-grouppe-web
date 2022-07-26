import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import RequestsTable from "../../../components/requestsTable";
import {BeatLoader} from "react-spinners";
import Pagination from "react-js-pagination"
import {useStateValue} from "../../../states/StateProvider";

const RequestsList = ({bills, header, loading, slug, status}) => {

    const [{pageNumber}, dispatch] = useStateValue();

    return (
        <div>
            {
                slug && slug !== header ?
                    ''
                    :
                    <div className='tableContainer'>
                        <h1 style={{textTransform:'capitalize'}}>{header}</h1>
                        {
                            loading ?
                                <div style={{minHeight: '10vh'}}>
                                    <BeatLoader size={20} color={'#73856f'}/>
                                </div>
                                :
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>NAME</th>
                                        <th>REQUEST</th>
                                        <th>PERIOD</th>
                                        <th>DEADLINE</th>
                                        <th>VERIFY</th>
                                    </tr>
                                    </thead>
                                    {
                                        bills?.length === 0 ?
                                            <thead>
                                            <tr>
                                                <th style={{minHeight: '10vh', color: 'black'}}>No Requests On This
                                                    Scope
                                                </th>
                                            </tr>
                                            </thead>
                                            :
                                            bills?.data.map((req, key) => (
                                                req.bill &&
                                                <RequestsTable
                                                    key={req.id}
                                                    id={req.id}
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
                        <div hidden={slug} className='listBottom'>
                            <Link to={`/dashboard/${header}`}>See all</Link>
                        </div>
                        <div hidden={!slug}>
                            <Pagination
                                activePage={bills?.current_page ? bills?.current_page : 0}
                                itemsCountPerPage={bills?.per_page ? bills?.per_page : 0 }
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
