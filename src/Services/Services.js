import axios from "axios";

export const getAllUsers = async () => await axios.get("/api/users");

export const getSelectedUserDetail = async ({ user }) =>
    await axios.get(`/api/users/${user._id}`);

export const getAllPosts = async () => await axios.get("/api/posts");

export const getAllBookmarks = async (encodedToken) =>
    await axios.get("/api/users/bookmark/", {
        headers: {
            authorization: encodedToken,
        },
    });

export const likePostService = async ({ post, encodedToken }) => {
    // console.log(`/api/posts/like/${post._id}`);
    return axios.post(
        `/api/posts/like/${post._id}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const getUserDetails = async (username) => {
    return axios.get(`/api/posts/user/${username}`);
};

export const disLikePostService = async ({ post, encodedToken }) => {
    return axios.post(
        `/api/posts/dislike/${post._id}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const bookmarkPostService = async ({ post, encodedToken }) => {
    return axios.post(
        `/api/users/bookmark/${post._id}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const removeBookmarkPostService = async ({ post, encodedToken }) => {
    return axios.post(
        `/api/users/remove-bookmark/${post._id}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const addPost = async ({ postContent, encodedToken }) => {
    return axios.post(
        `/api/posts`,
        {
            postData: postContent,
        },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const DeletePost = async ({ post, encodedToken }) => {
    return axios.delete(`/api/posts/${post._id}`, {
        headers: {
            authorization: encodedToken,
        },
    });
};

export const followService = async ({ userid, encodedToken }) => {
    return axios.post(
        `/api/users/follow/${userid}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );

    // console.log(response);
    // return axios.post(
    //     `/api/users/follow/${userid}`,
    //     {},
    //     {
    //         headers: {
    //             authorization: encodedToken,
    //         },
    //     }
    // );
};

export const UnFollowService = async ({ userid, encodedToken }) => {
    return axios.post(
        `/api/users/unfollow/${userid}`,
        {},
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

export const getAllComments = async ({ post }) => {
    return axios.get(`/api/comments/${post._id}`);
};

export const AddCommentToPost = async ({
    post,
    commentContent,
    encodedToken,
}) => {
    return axios.post(
        `/api/comments/add/${post._id}`,
        {
            commentData: { comment: commentContent },
        },
        {
            headers: {
                authorization: encodedToken,
            },
        }
    );
};

// "username": "adarshbalika",
// "password": "adarshBalika123",
