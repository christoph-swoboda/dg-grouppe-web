import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {BeatLoader} from "react-spinners";
import EmployeesTable from "../../../components/employeesTable";
import Pagination from "react-js-pagination"
import {useStateValue} from "../../../states/StateProvider";

const EmployeesList = ({loading, users, search}) => {

    const [{pageNumber}, dispatch] = useStateValue();

    return (
        <div className='employeesList'>
            <div className='tableContainer'>
                <table>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th>COMPANY</th>
                        <th>CAR</th>
                        <th>TRAIN</th>
                        <th>INTERNET</th>
                        <th>PHONE</th>
                        <th>OPEN REQUESTS</th>
                        <th>STATUS</th>
                        <th>SEND REQUEST</th>
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
                            :  users?.data?.length>0?
                                users?.data?.map(u => (
                                    <EmployeesTable
                                        key={u.id}
                                        id={u.id}
                                        loading={loading}
                                        enabled={u.enabled}
                                        name={`${u?.employees?.first_name} ${u?.employees?.last_name}`}
                                        bills={u.bills}
                                        types={u?.employees?.types}
                                    />
                                ))
                                : search!=='' &&
                                    <tbody>
                                    <tr>
                                        <th style={{color: 'darkred'}}>Sorry, No User Found</th>
                                    </tr>
                                    </tbody>
                    }
                </table>
                <Pagination
                    activePage={users?.current_page ? users?.current_page : 0}
                    itemsCountPerPage={users?.per_page ? users?.per_page : 0 }
                    totalItemsCount={users?.total ? users?.total : 0}
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
    )
}

export default EmployeesList

EmployeesList.propTypes = {
    search: PropTypes.string,
    loading: PropTypes.bool,
    users: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
}
