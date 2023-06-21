import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

const PostsFilter = () => {
    const { handleFilters } = useContext(DataContext);

    return (
        <div>
            <label htmlFor="posts">Choose a filter:</label>{" "}
            <select name="posts" id="posts" onClick={(e) => handleFilters(e)}>
                <option value="all">All</option>
                <option value="oldest">Oldest</option>
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
            </select>
        </div>
    );
};

export default PostsFilter;
