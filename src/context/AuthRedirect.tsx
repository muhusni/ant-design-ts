import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthRedirect = () => {
    const { state } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (state.isAuthenticated && location.pathname === "/login") {
            navigate("/"); // Redirect logged-in users away from login page
        }
    }, [state.isAuthenticated, location, navigate]);

    return null;
};

export default AuthRedirect;
