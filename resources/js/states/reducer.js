export const initialState = {
    user: {},
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
        default:
            return state;
    }
};

export default reducer;
