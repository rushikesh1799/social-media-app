import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { DataReducer } from "../reducers/DataReducer";
import {
    DeletePost,
    addPost,
    bookmarkPostService,
    disLikePostService,
    followService,
    getAllBookmarks,
    getAllPosts,
    getAllUsers,
    likePostService,
    removeBookmarkPostService,
} from "../Services/Services";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
export const DataContext = createContext();

const initialState = {
    users: [],
    posts: [],
    category: "trending",
    filter: "",
    bookmarks: [],
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);

    // destructuring of the initialState
    const { users, posts, category, bookmarks, filter } = state;

    useEffect(() => {
        console.log("users:", users);
    }, [users]);

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

            // const fetchBookmarksData = await getAllBookmarks(token);
            // Need to work on these getAllBookmarks result data here
            // console.log(fetchBookmarksData);
        };

        fetchData();
    }, [token]);

    const fetchAllPosts = async () => {
        const result = await getAllPosts();
        if (result.status === 200 || result.status === 201) {
            // console.log(fetchAllPosts.data.posts);
            dispatch({
                type: "GET_POSTS",
                payload: { posts: result.data.posts },
            });
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const handleLike = async (post) => {
        const result = await likePostService({
            post: { ...post },
            encodedToken: token,
        });
        console.log("Like Result", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "ADD_LIKE",
                payload: { posts: result.data.posts },
            });
        }
    };
    const handleDisLike = async (post) => {
        const result = await disLikePostService({
            post: { ...post },
            encodedToken: token,
        });
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "ADD_DISLIKE",
                payload: { posts: result.data.posts },
            });
        }
    };

    const handleBookmark = async (post) => {
        const result = await bookmarkPostService({
            post: post,
            encodedToken: token,
        });
        // console.log("Bookmark Result:", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "ADD_BOOKMARK",
                payload: { bookmarks: result.data.bookmarks },
            });
        }
    };

    const handleRemoveBookmark = async (post) => {
        const result = await removeBookmarkPostService({
            post: { ...post },
            encodedToken: token,
        });
        // console.log("Remove Bookmark Result:", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "REMOVE_BOOKMARK",
                payload: { bookmarks: result.data.bookmarks },
            });
        }
    };

    const handleDelete = async (post) => {
        console.log(post);
        const result = await DeletePost({
            post: { ...post },
            encodedToken: token,
        });
        console.log("Delete Post Result:", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "DELETE_POST",
                payload: { posts: result.data.posts },
            });
        }
    };

    // const handleFollowUser = async (userID) => {
    //     const result = await fetch(`/api/users/follow/${userID}`, {
    //         method: "POST",
    //         headers: {
    //             authorization: token,
    //         },
    //     });
    //     const data = await result.json();
    //     console.log(data);
    // };

    const handleFollowUser = async (user) => {
        // console.log(userID);
        const result = await followService({
            userid: user._id,
            encodedToken: token,
        });
        // const data = await result.json();
        console.log("handleFollowUser", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "HANDLE_FOLLOW",
                payload: {
                    user: result.data.user,
                    followUser: result.data.followUser,
                    currentUser: user,
                },
            });
        }
    };

    const handleAddPost = async (postContent) => {
        const result = await addPost({
            postContent: { content: postContent },
            encodedToken: token,
        });
        dispatch({ type: "ADD_POSTS", payload: { posts: result.data.posts } });
    };

    // postData: { content: postContent },

    const handleCategory = (e) => {
        // console.log(e.target.value.toLowerCase());
        dispatch({
            type: "SET_CATEGORY",
            payload: e.target.value.toLowerCase(),
        });
    };

    const handleFilters = (e) => {
        // console.log(e.target.value);
        dispatch({
            type: "SET_FILTER",
            payload: e.target.value,
        });
    };

    return (
        <DataContext.Provider
            value={{
                users,
                posts,
                loading,
                category,
                filter,
                bookmarks,
                setLoading,
                handleLike,
                handleDisLike,
                handleBookmark,
                handleRemoveBookmark,
                handleDelete,
                handleFollowUser,
                handleCategory,
                handleFilters,
                handleAddPost,
                dispatch,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

// {
//     "username": "pratik0077",
//     "password":"asd"
//     }

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3YmUxNjQyZi04Mjk5LTRhMTgtYWY4Yi1lM2M0ZGU5M2I2MWEiLCJ1c2VybmFtZSI6InByYXRpazAwNzcifQ.2BmxqEWdpHUrpMiuoxi3kP2nclAUfmp0G-9VQFIzIxs"
