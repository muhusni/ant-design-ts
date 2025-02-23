import { createContext, useReducer, ReactNode, useContext, useEffect, useState } from "react";
import API from "../config/axiosConfig";
import { UserLogin } from "../types/auth";
import qs from "qs";
import { useNavigate } from "react-router-dom";

// Auth state type
interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
}

// Actions for reducer
type AuthAction =
    | { type: "LOGIN"; payload: any }
    | { type: "LOGOUT" };

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload, isAuthenticated: true };
        case "LOGOUT":
            return { user: null, isAuthenticated: false };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext<{
    state: AuthState;
    loading: boolean;
    login: (values: UserLogin) => Promise<void>;
    logout: () => void;
} | null>(null);

// Auth Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true); // Prevents UI from rendering too soon
    const navigate = useNavigate();

    // Check authentication before rendering app
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await API.get("http://localhost:8000/me");
                dispatch({ type: "LOGIN", payload: response.data });
                navigate("/"); // Redirect to home if logged in
            } catch (error) {
                dispatch({ type: "LOGOUT" });
            } finally {
                setLoading(false); // Ensure UI renders only after check
            }
        };
        checkAuth();
    }, []);

    // Login function
    const login = async (login_data: UserLogin) => {
        try {
            await API.post(
                "http://localhost:8000/login",
                qs.stringify(login_data),
                { withCredentials: true }
            );
            const user = await API.get("http://localhost:8000/me");
            dispatch({ type: "LOGIN", payload: user.data });
            navigate("/"); // Redirect to home after login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Logout function
    const logout = async () => {
        await API.post("http://localhost:8000/logout", {}, { withCredentials: true });
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    // Show loading screen until auth check is done
    if (loading) return <div></div>;

    return (
        <AuthContext.Provider value={{ state, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
