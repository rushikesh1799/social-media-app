export const DataReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: [...action.payload.users],
            };
        case "GET_POSTS":
            return {
                ...state,
                posts: [...action.payload.posts],
            };

        default:
            return state;
    }
};
