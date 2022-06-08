export const initialState = {
    user: {},
    addEmployeeModal:false,
    approvalModal:false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
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
        default:
            return state;
    }
};

export default reducer;
