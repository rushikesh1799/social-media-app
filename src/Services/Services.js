import axios from "axios";

export const getAllUsers = async () => await axios.get("/api/users");

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

// "username": "adarshbalika",
// "password": "adarshBalika123",
