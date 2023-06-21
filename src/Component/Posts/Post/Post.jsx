import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { AuthContext } from "../../../context/AuthContext";

const Post = ({ post }) => {
    const {
        users,
        bookmarks,
        handleLike,
        handleDisLike,
        handleBookmark,
        handleRemoveBookmark,
    } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    const getFullName = (username) =>
        users
            .filter((user) => user.username === username)
            .reduce(
                (acc, curr) => acc + curr.firstName + " " + curr.lastName,
                ""
            );

    const getDateFormat = (inputDate) =>
        new Date(inputDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    // const handleDisLike = (post) => {
    //     console.log("Dislike this post", post);
    // };

    return (
        <div className="post-container">
            <div className="post-user">
                <div className="post-user-details">
                    <span>{getFullName(post?.username)}</span>
                    <span>@{post?.username}</span>
                </div>
                <span>{getDateFormat(post?.createdAt)}</span>
            </div>
            <div>
                <p className="post-content">{post.content}</p>
                {post.postImage ? (
                    <img
                        src={post?.postImage}
                        className="post-img"
                        alt="post-img"
                    />
                ) : (
                    <React.Fragment></React.Fragment>
                )}
            </div>
            <div className="post-btns">
                {/* Like Button section starts*/}
                <div>
                    {/* {console.log("bookmarks:", user?.bookmarks)} */}
                    {post?.likes.likedBy
                        .map((user) => user.username)
                        .includes(user?.username) ? (
                        <button onClick={() => handleDisLike(post)}>
                            <i className="fa fa-heart" aria-hidden="true"></i>{" "}
                            {post?.likes.likeCount > 0 ? (
                                <span>{post?.likes.likeCount}</span>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )}
                        </button>
                    ) : (
                        <button
                            className="like-btn"
                            onClick={() => handleLike(post)}
                        >
                            <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                            {post?.likes.likeCount > 0 ? (
                                <span>{post?.likes.likeCount}</span>
                            ) : (
                                <React.Fragment></React.Fragment>
                            )}
                        </button>
                    )}
                    {/* Like Button section ends*/}
                    {/* Comment Button section starts*/}
                    <button className="comment-btn">Comment</button>
                    {/* Comment Button section ends*/}
                    {/* Bookmark Button section starts*/}
                    {/* {console.log(user?.bookmarks)} */}
                    {bookmarks.includes(post._id) ? (
                        <button
                            className="bookmark-btn"
                            onClick={() => handleRemoveBookmark(post)}
                        >
                            <i
                                className="fa fa-bookmark"
                                aria-hidden="true"
                            ></i>
                        </button>
                    ) : (
                        <button
                            className="bookmark-btn"
                            onClick={() => handleBookmark(post)}
                        >
                            <i
                                className="fa fa-bookmark-o"
                                aria-hidden="true"
                            ></i>
                        </button>
                    )}

                    {/* Bookmark Button section ends*/}
                </div>
                <div>
                    {user?.username === post?.username ? (
                        <div>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                    ) : (
                        <div>
                            <button>UnFollow</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;
