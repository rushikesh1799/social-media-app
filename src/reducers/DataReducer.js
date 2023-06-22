import { users } from "../backend/db/users";

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
        case "ADD_LIKE":
            return {
                ...state,
                posts: [...action.payload.posts],
            };
        case "ADD_DISLIKE":
            return {
                ...state,
                posts: [...action.payload.posts],
            };
        case "ADD_BOOKMARK":
            return {
                ...state,
                bookmarks: [...action.payload.bookmarks],
            };
        case "REMOVE_BOOKMARK":
            return {
                ...state,
                bookmarks: [...action.payload.bookmarks],
            };
        case "ADD_POSTS":
            return {
                ...state,
                posts: [...action.payload.posts],
            };
        case "DELETE_POST":
            return {
                ...state,
                posts: [...action.payload.posts],
            };
        case "SET_CATEGORY":
            return {
                ...state,
                category: action.payload,
            };
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload,
            };
        case "ADD_COMMENT":
            return {
                ...state,
                posts: [...action.payload.posts],
            };
        case "HANDLE_FOLLOW":
            // const newUsersArray = users.map((user) =>
            //     user._id === action.payload.currentUser._id
            //         ? { ...action.payload.user }
            //         : user
            // );
            console.log(action.payload.currentUser);
        // return {
        //     ...state,
        //     users: users,
        // };
        default:
            return state;
    }
};

//render
