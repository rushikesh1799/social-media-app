import React, { useContext, useState } from "react";

import "./Signup.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const Signup = () => {
    const { setToken, setUser } = useContext(AuthContext);
    const { setLoading } = useContext(DataContext);
    const [showPassword, setShowPassword] = useState(false);
    const [signUpInfo, setSignUpInfo] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
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
    };

    // useEffect(() => {
    //     console.log("user", user);
    // }, [user]);

    return (
        <div className="page-container">
            <div className="signup-form-container">
                <h1>Register</h1>
                <br />
                <form onSubmit={handleSignUp} className="signup-form">
                    <div className="signUp__form__field">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={signUpInfo.fullname}
                            placeholder="Enter your fullname..."
                            onChange={(e) =>
                                setSignUpInfo((prev) => ({
                                    ...prev,
                                    fullname: e.target.value,
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
                            placeholder="Enter your username..."
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
                            placeholder="Enter your email..."
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
