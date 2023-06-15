import { createContext, useEffect, useReducer } from "react";
import { DataReducer } from "../reducers/DataReducer";
import { getAllPosts, getAllUsers } from "../Services/Services";

export const DataContext = createContext();

const initialState = {
    users: [],
    posts: [],
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);

    // destructuring of the initialState
    const { users, posts } = state;

    // useEffect(() => {
    //     console.log(posts);
    // }, [posts]);
    // useEffect(() => {
    //     console.log(users);
    // }, [users]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchAllUsersData = await getAllUsers();
            if (
                fetchAllUsersData.status === 200 ||
                fetchAllUsersData.status === 201
            ) {
                // console.log(fetchAllUsersData.data.users);
                dispatch({
                    type: "GET_USERS",
                    payload: { users: fetchAllUsersData.data.users },
                });
            }

            const fetchAllPosts = await getAllPosts();
            if (fetchAllPosts.status === 200 || fetchAllPosts.status === 201) {
                // console.log(fetchAllPosts.data.posts);
                dispatch({
                    type: "GET_POSTS",
                    payload: { posts: fetchAllPosts.data.posts },
                });
            }
        };
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ users, posts }}>
            {children}
        </DataContext.Provider>
    );
};
