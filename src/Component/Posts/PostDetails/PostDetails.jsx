import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Post from "../Post/Post";
import { DataContext } from "../../../context/DataContext";
import Navigation from "../../Navigation/Navigation";
import SuggUsers from "../../SuggUsers/SuggUsers";

import "./PostDetails.css";
import PostComments from "../PostComments/PostComments";
import NewComment from "../NewComment/NewComment";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import Header from "../../Header/Header";

const PostDetails = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { postID } = useParams();

    const { posts } = useContext(DataContext);

    // useEffect(async () => {
    //     console.log("postID", postID);
    //     try {
    //         const result = await axios.get(`/api/posts/${postID}`);
    //         console.log("current post details", result.data.post);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });

    const post = posts.find((post) => post._id === postID);

    console.log("postDetails Post", post);

    // useEffect(() => {
    //     console.log("postID", postID);
    // }, [postID]);
    // useEffect(() => {
    //     console.log("posts", posts);
    // }, [posts]);

    return (
        // <div>{postID}</div>
        <div>
            <Header />
            <div className="home-primary-container">
                <Navigation />
                <div className="post-mid-section">
                    <header className="post-header">
                        <i
                            className="fa fa-arrow-left left__arrow"
                            aria-hidden="true"
                            onClick={() => navigate(-1)}
                        ></i>
                        <h2 className="post__heading">Post</h2>
                    </header>
                    <Post post={post} />
                    <NewComment user={user} CurrentPost={post} />
                    <PostComments post={post} />
                </div>
                <SuggUsers />
            </div>
        </div>
    );
};

export default PostDetails;
