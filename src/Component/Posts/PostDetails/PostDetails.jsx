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

const PostDetails = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const { postID } = useParams();

    const { posts } = useContext(DataContext);

    const post = posts.find((post) => post._id === postID);

    // console.log(user);

    return (
        <div className="home-primary-container">
            <Navigation />
            <div>
                <header className="post-header">
                    <i
                        className="fa fa-arrow-left left__arrow"
                        aria-hidden="true"
                        onClick={() => navigate("/home")}
                    ></i>
                    <h2 className="post__heading">Post</h2>
                </header>
                <Post post={post} />
                <NewComment user={user} CurrentPost={post} />
                <PostComments post={post} />
            </div>
            <SuggUsers />
        </div>
    );
};

export default PostDetails;
