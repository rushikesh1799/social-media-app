import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { DataReducer } from "../reducers/DataReducer";
import {
    AddCommentToPost,
    DeletePost,
    UnFollowService,
    addPost,
    bookmarkPostService,
    disLikePostService,
    editPost,
    editUserDetails,
    followService,
    getAllBookmarks,
    getAllComments,
    getAllPosts,
    getAllUsers,
    getSelectedUserDetail,
    likePostService,
    removeBookmarkPostService,
} from "../Services/Services";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const DataContext = createContext();

const initialState = {
    users: [],
    posts: [],
    category: "trending",
    filter: "latest",
    bookmarks: [],
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);
    const [loading, setLoading] = useState(false);
    const { user, token, setToken, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    // destructuring of the initialState
    const { users, posts, category, bookmarks, filter } = state;

    useEffect(() => {
        console.log("posts:", posts);
    }, [posts]);

    // console.log("bookmarks", bookmarks);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                navigate("/login");
            } else {
                try {
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

                    const fetchAllBookmarksData = await getAllBookmarks(token);
                    // console.log("fetchAllBookmarksData", fetchAllBookmarksData);

                    if (
                        fetchAllBookmarksData.status === 200 ||
                        fetchAllBookmarksData.status === 201
                    ) {
                        dispatch({
                            type: "GET_BOOKMARKS",
                            payload: {
                                bookmarks: fetchAllBookmarksData.data.bookmarks,
                            },
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            // const fetchBookmarksData = await getAllBookmarks(token);
            // Need to work on these getAllBookmarks result data here
            // console.log(fetchBookmarksData);
        };

        fetchData();
    }, [token]);

    const fetchAllPosts = async () => {
        const result = await getAllPosts();

        // console.log("posts rerender");

        if (result.status === 200 || result.status === 201) {
            // console.log(fetchAllUsersData.data.users);
            dispatch({
                type: "GET_POSTS",
                payload: { posts: result.data.posts },
            });
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, [users]);

    const getSelectedPosts = () => {
        if (users) {
            try {
                const allFollowedUsers1 = users
                    .find(
                        (currentUser) => currentUser.username === user.username
                    )
                    .following.map((user) => user.username);

                const followedUsersPosts = posts.filter((post) =>
                    allFollowedUsers1.includes(post.username)
                );

                return followedUsersPosts;
                // console.log("followedUsersPosts", followedUsersPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const selectedPosts = getSelectedPosts();

    const handleGetSelectedUser = async (selectedUser) => {
        const result = await getSelectedUserDetail({ user: selectedUser });
        navigate(`/profile/${selectedUser?.username}`);
        console.log("handleGetSelectedUser result", result);
    };

    const handleLike = async (post) => {
        const result = await likePostService({
            post: { ...post },
            encodedToken: token,
        });
        // console.log("Like Result", result);
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

    const handleFollowUser = async (user) => {
        console.log(user);
        const result = await followService({
            userid: user._id,
            encodedToken: token,
        });
        // const data = await result.json();
        console.log("handleFollowUser", result);

        const newUsersArray = users.map((selectedUser) =>
            selectedUser.username === result.data.user.username
                ? { ...result.data.user }
                : selectedUser.username === result.data.followUser.username
                ? { ...result.data.followUser }
                : selectedUser
        );

        // console.log(newUsersArray);

        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "HANDLE_FOLLOW",
                payload: {
                    users: [...newUsersArray],
                },
            });
        }
    };

    const handleUnFollowUser = async (user) => {
        const result = await UnFollowService({
            userid: user._id,
            encodedToken: token,
        });
        // console.log("handle UnFollowUser Result", result);

        const newUsersArray = users.map((selectedUser) =>
            selectedUser.username === result.data.user.username
                ? { ...result.data.user }
                : selectedUser.username === result.data.followUser.username
                ? { ...result.data.followUser }
                : selectedUser
        );

        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "HANDLE_UNFOLLOW",
                payload: {
                    users: [...newUsersArray],
                },
            });
        }
    };

    const handleAddPost = async (postContent) => {
        const result = await addPost({
            postContent: { content: postContent },
            encodedToken: token,
        });
        console.log(result);
        dispatch({ type: "ADD_POSTS", payload: { posts: result.data.posts } });
    };

    // postData: { content: postContent },

    // on clicking on edit button - open the modal
    // in modal create input element and give it value as some state, update that onChange and pass it as postUpdatedContent in handleEditPost function while clicking on submit button of modal.

    const handleEditPost = async (updatedPost) => {
        const result = await editPost({
            postContent: updatedPost,
            encodedToken: token,
        });
        // console.log("handleEditPost result", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "EDIT_POSTS",
                payload: { posts: result.data.posts },
            });
        }
    };

    const handleEditUserDetails = async (updatedUserDetails) => {
        const result = await editUserDetails({
            userContent: updatedUserDetails,
            encodedToken: token,
        });
        // console.log("handleEditUserDetails", result);

        const newUpdatedUsers = users.map((selectedUser) =>
            selectedUser.username === result.data.user.username
                ? { ...result.data.user }
                : selectedUser
        );

        console.log("newUpdatedUsers", newUpdatedUsers);

        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "EDIT_USER_INFO",
                payload: { users: newUpdatedUsers },
            });
        }
    };

    const handleCategory = (e) => {
        // console.log(e.target.value.toLowerCase());
        dispatch({
            type: "SET_CATEGORY",
            payload: e.target.value.toLowerCase(),
        });
    };

    const handleFilters = (e) => {
        console.log(e);
        dispatch({
            type: "SET_FILTER",
            payload: e.target.id,
        });
    };

    const handlePostClick = async (post) => {
        const result = await getAllComments({ post: post });
        console.log("Get Comments Result", result);
        navigate(`/post/${post._id}`);
    };

    const handlePostComment = async (e, post, cmtContent) => {
        e.preventDefault();
        const result = await AddCommentToPost({
            post: post,
            commentContent: cmtContent,
            encodedToken: token,
        });
        console.log("handlePostComment result", result);
        if (result.status === 200 || result.status === 201) {
            dispatch({
                type: "ADD_COMMENT",
                payload: { posts: result.data.posts },
            });
        }
    };

    const getCategoryPosts = () => {
        const getPosts = posts?.filter(
            (post) => post?.category.toLowerCase() === category
        );
        return getPosts;
    };

    const getTrendingPosts = () => {
        const newTrendingPostsArray =
            selectedPosts &&
            [...selectedPosts].sort(
                (a, b) => b.likes.likeCount - a.likes.likeCount
            );
        return newTrendingPostsArray;
    };

    const loginAsGuest = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Hello");
        try {
            const data = {
                username: "adarshbalika",
                password: "adarshBalika123",
            };
            const result = await axios.post(`/api/auth/login`, data);
            console.log(result);
            if (result.status === 200 || result.status === 201) {
                localStorage.setItem("token", result.data.encodedToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify(result.data.foundUser)
                );
                setToken(result.data.encodedToken);
                setUser(result.data.foundUser);
                setLoading(false);
                // ReactToastify("Logged in Successfully as Guest", "success");
                // clearState();
                navigate("/home");
            } else {
                // ReactToastify(
                //     "Something went wrong, Please try again!",
                //     "error"
                // );
            }
        } catch (error) {
            error?.response?.data?.errors?.map((e) =>
                // ReactToastify(e, "error")
                console.log(error)
            );
        }
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
                selectedPosts,
                setLoading,
                handleGetSelectedUser,
                handleLike,
                handleDisLike,
                handleBookmark,
                handleRemoveBookmark,
                handleDelete,
                handleFollowUser,
                handleUnFollowUser,
                handleCategory,
                handleFilters,
                handleAddPost,
                handleEditPost,
                handleEditUserDetails,
                dispatch,
                handlePostClick,
                handlePostComment,
                getCategoryPosts,
                getTrendingPosts,
                loginAsGuest,
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

// working on a function to get all the posts that are related to all the followed accounts in realtime.

// useEffect(() => {
//     const fetchAllPosts = async () => {
//         const result = await getAllPosts();

//         const allFollowedUsers = user.following.map(
//             (user) => user.username
//         );

//         const loggedInUserDetails = users
//             .filter(
//                 (currentUser) => currentUser.username === user.username
//             )[0]
//             .map((currentUser) =>
//                 currentUser.followers.map((user) => user.username)
//             );

//         const allFollowedUsers1 = loggedInUserDetails[0]?.map(
//             (currentUser) =>
//                 currentUser.followers.map((user) => user.username)
//         );
//         console.log("allFollowedUsers1", allFollowedUsers1);

//         const followedUsersPosts = result.data.posts.filter((post) =>
//             allFollowedUsers.includes(post.username)
//         );
//         // console.log(followedUsersPosts);

//         if (result.status === 200 || result.status === 201) {
//             // console.log(fetchAllPosts.data.posts);
//             dispatch({
//                 type: "GET_POSTS",
//                 payload: { posts: followedUsersPosts },
//             });
//         }
//     };
//     fetchAllPosts()
// }, [users]);
