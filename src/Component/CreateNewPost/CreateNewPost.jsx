import React from "react";
import "./CreateNewPost.css";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CreateNewPost = () => {
    const [postContent, setPostContent] = useState("");
    const { handleAddPost } = useContext(DataContext);

    // useEffect(() => {
    //     console.log(postContent);
    // }, [postContent]);

    return (
        <div className="new__post__container">
            <div className="create-a-post-wrapper">
                <textarea
                    className="new__post__input"
                    placeholder="What's happening?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                ></textarea>
                <div className="new__post__footer">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                    <button
                        className="post__btn"
                        onClick={() => handleAddPost(postContent)}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPost;
