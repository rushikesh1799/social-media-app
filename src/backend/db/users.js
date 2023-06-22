import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
    {
        _id: uuid(),
        firstName: "Adarsh",
        lastName: "Balika",
        fullName: "Adarsh Balika",
        profilePhoto: "https://picsum.photos/id/999/150",
        username: "adarshbalika",
        password: "adarshBalika123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        following: [
            {
                _id: uuid(),
                firstName: "Pratik",
                lastName: "Aher",
                fullName: "Pratik Aher",
                profilePhoto: "https://picsum.photos/id/1000/150",
                username: "pratik0077",
                password: "asd",
                createdAt: formatDate(),
                updatedAt: formatDate(),
                bookmarks: [],
            },
        ],
        followers: [
            {
                _id: uuid(),
                fullName: "Pratik Aher",
                username: "pratik0077",
                profileAvatar: "https://picsum.photos/id/1000/150",
            },
            {
                _id: uuid(),
                fullName: "Pravin Pagar",
                username: "pravin1",
                profileAvatar: "https://picsum.photos/id/1001/150",
            },
            {
                _id: uuid(),
                fullName: "Siddhant Bhadke",
                username: "sidias1",
                profileAvatar: "https://picsum.photos/id/1002/150",
            },
        ],
        bookmarks: [],
    },
    {
        _id: uuid(),
        firstName: "Pratik",
        lastName: "Aher",
        fullName: "Pratik Aher",
        profilePhoto: "https://picsum.photos/id/1000/150",
        username: "pratik0077",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        bookmarks: [],
    },
    {
        _id: uuid(),
        firstName: "Pravin",
        lastName: "Pagar",
        fullName: "Pravin Pagar",
        profilePhoto: "https://picsum.photos/id/1001/150",
        username: "pravin1",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        bookmarks: [],
    },
    {
        _id: uuid(),
        firstName: "Siddhant",
        lastName: "Bhadke",
        fullName: "Siddhant Bhadke",
        profilePhoto: "https://picsum.photos/id/1002/150",
        username: "sidias1",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        bookmarks: [],
    },
    {
        _id: uuid(),
        firstName: "Rohit",
        lastName: "N",
        fullName: "Rohit N",
        profilePhoto: "https://picsum.photos/id/1002/150",
        username: "rohit1",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        bookmarks: [],
    },
];
