export const initialState = {
    user: {},
    addEmployeeModal:false,
    approvalModal:false,
    sendReqModal:false,
    resolved:null,
    sendReqDone:false,
    approve:false,
    pageNumber:1,
    loadSettings:false,
    addEmployeeDone:false,
    approveData:{},
    reqData:{},
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
            case "SET_RESOLVED":
            return {
                ...state,
                resolved: action.item
            }
            case "Set_ApprovalModal":
            return {
                ...state,
                approvalModal: action.item
            }
            case "Set_EmployeeModal":
            return {
                ...state,
                addEmployeeModal: action.item
            }
            case "Set_SendReqModal":
            return {
                ...state,
                sendReqModal: action.item
            }
            case "Set_EmployeeSaved":
            return {
                ...state,
                addEmployeeDone: action.item
            }
            case "Set_Approved":
            return {
                ...state,
                approve: action.item
            }
            case "Set_SendReqDone":
            return {
                ...state,
                sendReqDone: action.item
            }
            case "setApproveData":
            return {
                ...state,
                approveData: action.item
            }
            case "setReqData":
            return {
                ...state,
                reqData: action.item
            }
            case "setPageNumber":
            return {
                ...state,
                pageNumber: action.item
            }
            case "setLoadSettings":
            return {
                ...state,
                loadSettings: action.item
            }
        default:
            return state;
    }
};

export default reducer;
