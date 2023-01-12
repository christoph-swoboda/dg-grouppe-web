import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {AiOutlineCloseCircle} from "react-icons/ai";
import '../style/modal.scss';

const Modal = ({ visible, toggle, component,className }) => visible ? ReactDOM.createPortal(
    <div className="modal">
        <div className="modal-content" role="dialog" aria-modal="true">
            {/*<AiOutlineCloseCircle onClick={toggle} color='black' size='2rem' style={{cursor:'pointer'}}/>*/}
            <div className={className}>
                {component}
            </div>
        </div>
    </div>, document.body
) : null;

export default Modal;
