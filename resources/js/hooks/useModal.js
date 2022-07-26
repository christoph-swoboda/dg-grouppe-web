import { useState } from 'react';
import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [visible2, setVisible2] = useState(false);
    const [{addEmployeeModal,approvalModal,sendReqModal}, dispatch] = useStateValue();

    function toggleEmployeeForm() {
        dispatch(
            {
                type: "Set_EmployeeModal",
                item: !addEmployeeModal,
            })
    }
    function toggleApprovalModal() {
        dispatch(
            {
                type: "Set_ApprovalModal",
                item: !approvalModal,
            })
    }
    function toggleSendReqModal() {
        dispatch(
            {
                type: "Set_SendReqModal",
                item: !sendReqModal,
            })
    }
    return {toggleEmployeeForm,toggleApprovalModal,toggleSendReqModal}
};

export default useModal;
