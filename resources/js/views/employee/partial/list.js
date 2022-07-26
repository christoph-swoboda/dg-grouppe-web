import React, {useMemo, useState} from "react";
import {BeatLoader} from "react-spinners";
import EmployeeTable from "../../../components/employeeTable";
import Pagination from "../../../components/pagination";
import PropTypes from "prop-types";

const List = ({user, bills, loading}) => {

    const [currentPage, setCurrentPage] = useState(1);
    let PageSize = 10;
    const currentPageData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return bills?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, bills]);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>COMPANY</th>
                    <th>REQUEST TYPE</th>
                    <th>PERIOD</th>
                    <th>ISSUED</th>
                    <th>DEADLINE</th>
                    <th>STATUS</th>
                    <th>VERIFY</th>
                </tr>
                </thead>
                {
                    loading ?
                        <tbody>
                        <tr>
                            <th>
                                <BeatLoader size={20} color={'#73856f'}/>
                            </th>
                        </tr>
                        </tbody>
                        : bills?.length > 0 ?
                            <>
                                {
                                    currentPageData?.map(bill => (
                                        bill.requests.map((req,key) => (
                                            bill.type[key]?.title &&
                                            <EmployeeTable
                                                key={req.id}
                                                id={req.id}
                                                company={user?.employees?.company}
                                                loading={loading}
                                                title={bill.title}
                                                status={req?.status}
                                                type={bill.type[key]?.title}
                                                responseImage={req?.response?.image}
                                                created_at={bill.created_at}
                                                period={new Date(bill.created_at).getMonth() + 1}
                                                year={new Date(bill.created_at).getFullYear()}
                                                created={new Date(bill.created_at).toLocaleDateString()}
                                                name={`${user?.employees?.first_name} ${user?.employees?.last_name}`}
                                            />
                                        ))
                                    ))
                                }
                            </>
                            :
                            <tbody>
                            <tr>
                                <th style={{color: 'darkred'}}>Sorry, No Requests Found</th>
                            </tr>
                            </tbody>

                }
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={bills?.length ? bills.length : 0}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}

export default List

List.propTypes = {
    loading: PropTypes.bool,
    bills: PropTypes.array,
    user: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
}
