import React from "react";
import "./CreateNewPost.css";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CreateNewPost = () => {
    const [postContent, setPostContent] = useState("");
    const { handleAddPost } = useContext(DataContext);

    const [previewSource, setPreviewSource] = useState("");
    // useEffect(() => {
    //     console.log(postContent);
    // }, [postContent]);

    const uploadImage = (e) => {
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        setPreviewSource(imgUrl);
    };

    return (
        <div className="new__post__container">
            <div className="create-a-post-wrapper">
                <div className="text-content-container">
                    <textarea
                        className="new__post__input"
                        placeholder="What's happening?"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>
                </div>
                {previewSource && (
                    <div className="media-container">
                        <img src={previewSource} className="input__img" />
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                )}

                <div className="new__post__footer">
                    <label htmlFor="file">
                        <i className="fa fa-picture-o" aria-hidden="true"></i>
                    </label>

                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        onChange={uploadImage}
                        accept=".png,.jpeg,.jpg"
                    ></input>

                    <button
                        className="post__btn"
                        onClick={() => {
                            handleAddPost(postContent, previewSource);
                            setPostContent("");
                            setPreviewSource("");
                        }}
                        disabled={postContent.length === 0 ? true : false}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPost;
