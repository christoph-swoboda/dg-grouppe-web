import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {AiOutlineCloseCircle} from "react-icons/ai";

const Modal = ({ visible, toggle, component,className }) => visible ? ReactDOM.createPortal(
    <div className="modal">
        <div className="modal-content" role="dialog" aria-modal="true">
            <AiOutlineCloseCircle onClick={toggle} color='white' size='2rem' style={{cursor:'pointer'}}/>
            <div className={className}>
                {component}
            </div>
        </div>
    </div>, document.body
) : null;

export default Modal;
