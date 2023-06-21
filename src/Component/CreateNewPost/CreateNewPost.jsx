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
            <textarea
                type="text"
                placeholder="What's happening?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
            <button onClick={() => handleAddPost(postContent)}>Post</button>
        </div>
    );
};

export default CreateNewPost;
