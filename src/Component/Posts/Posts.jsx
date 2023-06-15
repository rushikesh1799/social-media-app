import React, { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

const Posts = () => {
    const { posts, users } = useContext(DataContext);

    const getFullName = (username) =>
        users
            .filter((user) => user.username === username)
            .reduce(
                (acc, curr) => acc + curr.firstName + " " + curr.lastName,
                ""
            );

    // useEffect(() => {
    //     console.log(posts);
    // }, [posts]);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{getFullName(post.username)}</p>
                    <span>{post.content}</span>
                </div>
            ))}
        </div>
    );
};

export default Posts;
