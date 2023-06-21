import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>MySocialCircle</h1>
            <NavLink to="/signup">Join Now</NavLink>
            <br />
            <NavLink to="/login">Already have an account</NavLink>
        </div>
    );
};

export default LandingPage;
