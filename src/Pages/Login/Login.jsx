import axios from "axios";
import ReactPlayer from "react-player";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import { DataContext } from "../../context/DataContext";

const Login = () => {
    const { setToken, setUser } = useContext(AuthContext);
    const { loginAsGuest } = useContext(DataContext);
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    // useEffect(() => {
    //     console.log(token);
    // }, [token]);

    const navigate = useNavigate();
    const { setLoading } = useContext(DataContext);
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post("/api/auth/login", loginInfo);
            // console.log(response);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("token", response.data.encodedToken);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.foundUser)
                );
                setToken(response.data.encodedToken);
                setUser(response.data.foundUser);
                setLoading(false);
                // navigate(-1);
            }
            navigate("/home");
        } catch (error) {
            // console.log(error.response);
            if (error.response.status === 404) {
                console.log(
                    "The username you entered is not Registered. Not Found error"
                );
            } else if (error.response.status === 401) {
                console.log(
                    "The credentials you entered are invalid. Unauthorized access error."
                );
            }
            console.log(error.response.status);
        }
    };

    return (
        <div className="login__page__container">
            <section className="login-video-container">
                <ReactPlayer
                    url="https://res.cloudinary.com/dwegb6a4s/video/upload/v1688355287/Video_for_social_media_Project_mk2kkg.mp4"
                    playing
                    playbackRate={1.5}
                    muted
                    loop
                    controls={false}
                    width={"100%"}
                    height={"100%"}
                />
            </section>

            <div className="form-container">
                <h1>Login</h1>
                <br />
                <form className="login__form">
                    <div>
                        <label className="login__form__labels">Username:</label>
                        <input
                            type="text"
                            value={loginInfo.email}
                            onChange={(e) =>
                                setLoginInfo((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                            className="login__form__input"
                        />
                    </div>
                    <br />
                    <div>
                        <label className="login__form__labels">Password:</label>
                        <input
                            type="password"
                            value={loginInfo.password}
                            onChange={(e) =>
                                setLoginInfo((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                            className="login__form__input"
                        />
                    </div>
                    <br />
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                    <button type="submit" onClick={loginAsGuest}>
                        Login with Guest Credentials
                    </button>
                    <span>
                        Don't have an account?{" "}
                        <NavLink to="/signup">Join Now</NavLink>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
