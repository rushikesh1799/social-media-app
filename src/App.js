import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/SignUp/Signup";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/ExplorePage/Explore";
import Bookmark from "./Pages/BookmarkPage/Bookmark";
import Mockman from "mockman-js";
import RequiresAuth from "./Component/RequiresAuth/RequiresAuth";
import PostDetails from "./Component/Posts/PostDetails/PostDetails";
import UserDetails from "./Pages/UserDetails/UserDetails";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/post/:postID" element={<PostDetails />}></Route>
                <Route
                    path="/profile/:userName"
                    element={<UserDetails />}
                ></Route>
                <Route path="/signup" element={<Signup />}>
                    SignUp
                </Route>
                <Route path="/login" element={<Login />}>
                    Login
                </Route>
                <Route path="/explore" element={<Explore />}>
                    Explore
                </Route>
                <Route
                    path="/bookmark"
                    element={
                        <RequiresAuth>
                            <Bookmark />
                        </RequiresAuth>
                    }
                >
                    Bookmark
                </Route>
                <Route path="/mockman" element={<Mockman />}>
                    Bookmark
                </Route>
            </Routes>
        </div>
    );
}

export default App;
