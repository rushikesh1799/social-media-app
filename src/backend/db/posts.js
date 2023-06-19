import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
    {
        _id: uuid(),
        content:
            "Went out to a fine restaurant called Mezza9 this tuesday. The ambience is pretty good and the cocktails are superb.",
        likes: {
            likeCount: 2,
            likedBy: [],
            dislikedBy: [],
        },
        username: "adarshbalika",
        price: 15,
        fullName: "Adarsh Balika",
        category: "Trending",
        postImage:
            "https://lh3.googleusercontent.com/p/AF1QipPyndUkB0oO1QSL4l7MEULJZOu-2DAqoWGqKe9l=s1360-w1360-h1020",
        createdAt: "2023-05-11",
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                comment: "Nice!",
                fullName: "Pravin Pagar",
                username: "pravin1",

                profileAvatar: "https://picsum.photos/id/1001/150",
                createdAt: formatDate(),
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
            {
                _id: uuid(),
                comment: "Wow!",
                fullName: "Adarsh Balika",
                username: "adarshbalika",
                profileAvatar: "https://picsum.photos/id/999/150",
                createdAt: "2023-05-12",
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
        ],
    },
    {
        _id: uuid(),
        content:
            "Just witnessed another breathtaking display of brilliance from the 🐐 himself, Lionel Messi! The way he controls the game with his magical feet is a pure joy to watch. No wonder he's hailed as the greatest of all time. 🙌⚽️ #Messi #GOAT #FootballWizard",
        likes: {
            likeCount: 0,
            likedBy: [],
            dislikedBy: [],
        },
        username: "pratik0077",
        price: 20,
        fullName: "Pratik Aher",
        category: "Sports",
        postImage:
            "https://www.aljazeera.com/wp-content/uploads/2022/12/SSS10784_1.jpg?resize=1170%2C780&quality=80",
        createdAt: "2022-12-19",
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                comment: "#GOAT!",
                fullName: "Pravin Pagar",
                username: "pravin1",

                profileAvatar: "https://picsum.photos/id/1001/150",
                createdAt: formatDate(),
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
            {
                _id: uuid(),
                comment: "He is the greatest of all!",
                fullName: "Adarsh Balika",
                username: "adarshbalika",
                profileAvatar: "https://picsum.photos/id/999/150",
                createdAt: "2023-05-12",
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
        ],
    },
    {
        _id: uuid(),
        content:
            "Just cleared the UPSC IAS exam and I'm on cloud nine! 🌟 The journey was tough, but every late-night study session and sacrifice paid off. Feeling incredibly grateful for the support and guidance that got me through this. Dreams do come true! 💪📚 #UPSC #IAS #DreamsComeTrue",
        likes: {
            likeCount: 3,
            likedBy: [],
            dislikedBy: [],
        },
        username: "sidias1",
        price: 12,
        fullName: "Siddhant Bhadke",
        category: "Trending",
        createdAt: "2024-06-15",
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                comment: "#GOAT!",
                fullName: "Pravin Pagar",
                username: "pravin1",

                profileAvatar: "https://picsum.photos/id/1001/150",
                createdAt: formatDate(),
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
            {
                _id: uuid(),
                comment: "He is the greatest of all!",
                fullName: "Adarsh Balika",
                username: "adarshbalika",
                profileAvatar: "https://picsum.photos/id/999/150",
                createdAt: "2023-05-12",
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
        ],
    },
    {
        _id: uuid(),
        content:
            "🚀 Exciting times ahead in the world of technology! From AI and automation to blockchain and quantum computing, innovations are shaping our future in incredible ways. Buckle up, folks, because the tech revolution is just getting started! 🌐💡 #TechRevolution #Innovation #FutureTech",
        likes: {
            likeCount: 3,
            likedBy: [],
            dislikedBy: [],
        },
        username: "pravin1",
        price: 8,
        fullName: "Pravin Pagar Bhadke",
        category: "Technology",
        createdAt: "2023-06-10",
        updatedAt: formatDate(),
        comments: [
            {
                _id: uuid(),
                comment: "#GOAT!",
                fullName: "Pravin Pagar",
                username: "pravin1",

                profileAvatar: "https://picsum.photos/id/1001/150",
                createdAt: formatDate(),
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
            {
                _id: uuid(),
                comment: "He is the greatest of all!",
                fullName: "Adarsh Balika",
                username: "adarshbalika",
                profileAvatar: "https://picsum.photos/id/999/150",
                createdAt: "2023-05-12",
                updatedAt: formatDate(),
                votes: {
                    upvotedBy: [],
                    downvotedBy: [],
                },
            },
        ],
    },
];
