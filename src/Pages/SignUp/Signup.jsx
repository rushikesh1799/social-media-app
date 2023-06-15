import React, { useContext, useEffect, useState } from "react";

import "./Signup.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const { token, setToken, user, setUser } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const [signUpInfo, setSignUpInfo] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
    });

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const {
                data: { encodedToken, createdUser },
            } = await axios.post("/api/auth/signup", signUpInfo);

            console.log(createdUser);

            localStorage.setItem("token", encodedToken);
            localStorage.setItem("user", JSON.stringify(createdUser));

            setToken(encodedToken);
            setUser(createdUser);
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
        <div className="form-container">
            <h1>SignUp</h1>
            <br />
            <form onSubmit={handleSignUp} className="signup-form">
                <label>
                    Full Name:
                    <input
                        type="text"
                        value={signUpInfo.fullname}
                        onChange={(e) =>
                            setSignUpInfo((prev) => ({
                                ...prev,
                                fullname: e.target.value,
                            }))
                        }
                        required
                    />
                </label>
                <label>
                    UserName:
                    <input
                        type="text"
                        value={signUpInfo.username}
                        onChange={(e) =>
                            setSignUpInfo((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        value={signUpInfo.email}
                        onChange={(e) =>
                            setSignUpInfo((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type={!showPassword ? "password" : "text"}
                        value={signUpInfo.password}
                        onChange={(e) =>
                            setSignUpInfo((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        Show Password
                    </button>
                </label>
                <button type="submit" className="Submit-btn">
                    Create New Account
                </button>
                <span>
                    Already have an account?{" "}
                    <NavLink to="/login">Log In</NavLink>
                </span>
            </form>
        </div>
    );
};

export default Signup;
