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
        username: "adarshbalika",
        password: "adarshBalika123",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: uuid(),
        firstName: "Pratik",
        lastName: "Aher",
        profilePhoto: "https://picsum.photos/id/1000/150",
        username: "pratik0077",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
    {
        _id: uuid(),
        firstName: "Pravin",
        lastName: "Pagar",
        username: "pravin1",
        password: "asd",
        createdAt: formatDate(),
        updatedAt: formatDate(),
    },
];
