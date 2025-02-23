import { Routes, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import ToDoList from "../views/ToDoList";
import Layout from "../layout/Layout"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/to-do-list" element={<ToDoList />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;