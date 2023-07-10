import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Signup.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const Signup = () => {
    const { setToken, setUser } = useContext(AuthContext);
    const { setLoading } = useContext(DataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUpInfo, setSignUpInfo] = useState({
        firstName: "",
        lastName: "",
        // fullName: "",
        username: "",
        email: "",
        password: "",
        profilePhoto:
            "https://cdn4.iconfinder.com/data/icons/essential-app-2/16/user-avatar-human-admin-login-512.png",
        bio: "Hey there!",
        website_link: "https://rushikeshbunge-portfolio.netlify.app/",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (confirmPassword !== signUpInfo.password) {
            notify();
        } else {
            setLoading(true);
            try {
                setTimeout(async () => {
                    const {
                        data: { encodedToken, createdUser },
                    } = await axios.post("/api/auth/signup", signUpInfo);
                    localStorage.setItem("token", encodedToken);
                    localStorage.setItem("user", JSON.stringify(createdUser));

                    setToken(encodedToken);
                    setUser(createdUser);
                    setLoading(false);
                }, 500);

                // console.log(createdUser);
                navigate("/home");
            } catch (error) {
                if (error.response.status === 422) {
                    console.log("User already exists");
                } else {
                    console.log(error);
                }
            }
        }
    };

    const notify = () => {
        toast.warn("Password is not matching!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    // useEffect(() => {
    //     console.log("user", user);
    // }, [user]);

    return (
        <div className="page-container">
            <ToastContainer />
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

            <div className="signup-form-container">
                <h1>Register</h1>
                <br />
                <form onSubmit={handleSignUp} className="signup-form">
                    {/* <div className="signUp__form__field">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={signUpInfo.fullName}
                            placeholder="Enter your fullname..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    fullName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div> */}
                    <div className="signUp__form__field">
                        <label>First Name:</label>
                        <input
                            type="text"
                            value={signUpInfo.firstName}
                            placeholder="Enter your First Name..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    firstName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="signUp__form__field">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            value={signUpInfo.lastName}
                            placeholder="Enter your Last Name..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    lastName: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="signUp__form__field">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={signUpInfo.username}
                            placeholder="Enter your Username..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    <div className="signUp__form__field">
                        <label>Email:</label>
                        <input
                            type="text"
                            value={signUpInfo.email}
                            placeholder="Enter your Email..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    <div className="signUp__form__field">
                        <label>Password:</label>
                        <div className="password__field">
                            <input
                                type={!showPassword ? "password" : "text"}
                                value={signUpInfo.password}
                                placeholder="Enter your password..."
                                onChange={(e) =>
                                    setSignUpInfo((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                required
                            />
                            {!showPassword ? (
                                <i
                                    className="fa fa-eye-slash password__icon"
                                    aria-hidden="true"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                ></i>
                            ) : (
                                <i
                                    className="fa fa-eye password__icon"
                                    aria-hidden="true"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                ></i>
                            )}
                        </div>
                    </div>
                    <div className="signUp__form__field">
                        <label>Confirm Password:</label>
                        <div className="password__field">
                            <input
                                type={
                                    !showConfirmPassword ? "password" : "text"
                                }
                                value={confirmPassword}
                                placeholder="Enter your password again..."
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                            {!showConfirmPassword ? (
                                <i
                                    className="fa fa-eye-slash password__icon"
                                    aria-hidden="true"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                ></i>
                            ) : (
                                <i
                                    className="fa fa-eye password__icon"
                                    aria-hidden="true"
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                ></i>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="Submit-btn">
                        Create New Account
                    </button>
                    <span>
                        Already have an account?{" "}
                        <NavLink to="/login">Log In</NavLink>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
