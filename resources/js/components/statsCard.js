import React from "react";
import RequestStatus from "./requestStatus";
import PropTypes from "prop-types";

const StatsCard = ({openReq, approvedReq, rejectedReq, user}) => {

    return (
        <div className='statCards'>
            <RequestStatus count={user ? openReq?.length : openReq} iconBg={'rgba(228, 186, 33, 1)'}
                           requestStatus='Anhängig'/>
            <RequestStatus count={user ? rejectedReq?.length : rejectedReq} iconBg={'rgba(228, 33, 104, 1)'}
                           requestStatus='Abgelehnt'/>
            <RequestStatus count={user ? approvedReq?.length : approvedReq} iconBg={'rgba(114, 200, 47, 1)'}
                           requestStatus='Bestätigt'/>
        </div>
    )
}

export default StatsCard

StatsCard.propTypes = {
    openReq: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number,
    ]),
    approvedReq: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number,
    ]),
    rejectedReq: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number,
    ]),
    user: PropTypes.bool,
}
