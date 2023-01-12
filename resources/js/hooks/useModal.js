import { useState } from 'react';
import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [visible2, setVisible2] = useState(false);
    const [{addEmployeeModal,approvalModal}, dispatch] = useStateValue();

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
    return {toggleEmployeeForm,toggleApprovalModal}
};

export default useModal;
