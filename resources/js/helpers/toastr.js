import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Notify = () => toast("Wow so easy!");

const ToastR = (props) => {

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default {Notify}
