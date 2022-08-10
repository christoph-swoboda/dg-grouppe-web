import React, {useState, useEffect} from "react";
import Requests from "../requests/index";
import {useParams} from "react-router";

const AllRequests = () => {

    let route=useParams();

    return (
        <div>
            <Requests slug={route.slug}/>
        </div>
    )
}

export default AllRequests
