import React, { useContext } from "react";
import { DataContext } from "../../../context/DataContext";

import "./PostFilters.css";

import WhatshotIcon from "@mui/icons-material/Whatshot";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const PostsFilter = () => {
    const { handleFilters, filter } = useContext(DataContext);

    return (
        <div className="filters__container" onClick={(e) => handleFilters(e)}>
            <div
                id="trending"
                value="trending"
                className="filters"
                style={{
                    fontWeight: `${filter === "trending" ? "700" : "400"}`,
                }}
            >
                <WhatshotIcon />
                Trending Posts
            </div>
            <div
                id="latest"
                value="latest"
                className="filters"
                style={{
                    fontWeight: `${filter === "latest" ? "700" : "400"}`,
                }}
            >
                <SwapVertIcon />
                Latest Posts
            </div>
        </div>
    );
};

export default PostsFilter;
