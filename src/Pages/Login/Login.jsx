import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
    const { token, user, setToken, setUser } = useContext(AuthContext);

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    // useEffect(() => {
    //     console.log(token);
    // }, [token]);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

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
                navigate("/home");
            }
        } catch (error) {
            if (error.response.status === 404) {
                console.log(
                    "The username you entered is not Registered. Not Found error"
                );
            } else if (error.response.status === 401) {
                console.log(
                    "The credentials you entered are invalid. Unauthorized access error."
                );
            }
            // console.log(error.response.status);
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <br />
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={loginInfo.email}
                        onChange={(e) =>
                            setLoginInfo((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={loginInfo.password}
                        onChange={(e) =>
                            setLoginInfo((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    />
                </label>
                <br />
                <button type="submit">Login</button>
                <span>
                    Don't have an account?{" "}
                    <NavLink to="/signup">Join Now</NavLink>
                </span>
            </form>
        </div>
    );
};

export default Login;
