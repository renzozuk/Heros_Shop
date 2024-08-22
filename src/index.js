import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AccountSettings from "./pages/AccountSettings";
import App from "./App";
import Department from "./pages/Department";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Review from "./pages/Review";
import Signup from "./pages/Signup";
import Successful from "./pages/Successful";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Department />
            },
            {
                path: "/departments/:category",
                element: <Department />
            },
            {
                path: "/payment/:product",
                element: <Payment />
            },
            {
                path: "/reviews/:product",
                element: <Review />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/account-settings",
                element: <AccountSettings />
            },
            {
                path: "/successful",
                element: <Successful />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
