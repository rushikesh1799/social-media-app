import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Navigate, useLocation } from "react-router-dom";

const RequiresAuth = ({ children }) => {
    const { token } = useContext(AuthContext);

    const location = useLocation();

    // useEffect(() => {
    //     console.log(token);
    // }, [token]);

    return token ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default RequiresAuth;
